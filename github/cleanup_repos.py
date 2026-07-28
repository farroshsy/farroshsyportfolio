#!/usr/bin/env python3
"""
Archive coursework repositories so the two systems projects are what a visitor
actually sees on github.com/farroshsy.

Archiving is reversible: an archived repo stays public and readable, it just
becomes read-only and sorts out of the way. Nothing is deleted here — this
script has no delete path at all.

Usage:
    export GITHUB_TOKEN=ghp_...          # needs the `repo` scope
    python3 cleanup_repos.py             # dry run: prints the plan, changes nothing
    python3 cleanup_repos.py --apply     # actually archives

Review the dry-run output before using --apply.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.request

USER = "farroshsy"
API = "https://api.github.com"

# Repos to leave alone. Everything else owned by USER gets archived.
# Add to this list, re-run the dry run, and check the plan again.
KEEP = {
    # The two featured systems projects
    "computervision-api-system",
    "hcie-system",
    # Supporting portfolio pieces
    "threejs-starter",
    "WebGL_Grafkom",
    "AutoClaim",
    "DiversityOnDisplay",
    "PBB-B_Awesome-Notifications-with-Firebase-in-Flutter-Apps",
    # Profile README repo — archiving this hides your profile page
    "farroshsy",
    # The portfolio site itself, once you push it
    "farros-portfolio",
}


def request(path: str, token: str, method: str = "GET", body: dict | None = None):
    url = path if path.startswith("http") else f"{API}{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Accept", "application/vnd.github+json")
    req.add_header("X-GitHub-Api-Version", "2022-11-28")
    if data:
        req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req) as resp:
        raw = resp.read()
        return json.loads(raw) if raw else None


def all_repos(token: str) -> list[dict]:
    repos, page = [], 1
    while True:
        batch = request(f"/user/repos?per_page=100&page={page}&affiliation=owner", token)
        if not batch:
            break
        repos.extend(batch)
        page += 1
    return repos


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="perform the archiving")
    parser.add_argument("--include-forks", action="store_true",
                        help="also archive forked repos (off by default)")
    args = parser.parse_args()

    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("Set GITHUB_TOKEN (needs `repo` scope).", file=sys.stderr)
        return 1

    repos = all_repos(token)
    owned = [r for r in repos if r["owner"]["login"].lower() == USER.lower()]

    targets = []
    for r in owned:
        if r["name"] in KEEP:
            continue
        if r["archived"]:
            continue
        if r["fork"] and not args.include_forks:
            continue
        targets.append(r)

    kept = [r for r in owned if r["name"] in KEEP]

    print(f"{len(owned)} owned repos · keeping {len(kept)} · archiving {len(targets)}\n")
    print("KEEP:")
    for r in sorted(kept, key=lambda r: r["name"].lower()):
        print(f"  · {r['name']}")
    print("\nARCHIVE:")
    for r in sorted(targets, key=lambda r: r["name"].lower()):
        flag = " (fork)" if r["fork"] else ""
        print(f"  · {r['name']}{flag}")

    if not args.apply:
        print("\nDry run — nothing changed. Re-run with --apply to archive.")
        return 0

    print()
    failures = 0
    for r in targets:
        try:
            request(f"/repos/{USER}/{r['name']}", token, method="PATCH",
                    body={"archived": True})
            print(f"  archived  {r['name']}")
        except urllib.error.HTTPError as e:
            failures += 1
            print(f"  FAILED    {r['name']}: {e.code} {e.reason}", file=sys.stderr)

    print(f"\nDone. {len(targets) - failures} archived, {failures} failed.")
    print("Undo any of them at Settings → General → Unarchive, or with "
          '`{"archived": false}`.')
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
