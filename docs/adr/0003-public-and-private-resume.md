# Public and private résumé from one source

The build produces two PDFs. The **public** one is linked from the site. It is capability-level (ADR 0004) and has no phone number. The **private** one is for job applications and adds the employer name, phone and a location line about the roles I'm looking for.

This repo is public, so private values never live in tracked files. They sit in `content/private.local.json`, which is gitignored and has the same shape as the tracked fields marked `visibility: "private"`. The private build merges that file in and writes `*.private.pdf`, which is gitignored too. With no local file, only the public PDF builds. No version, public or private, shows a street address.

`.githooks/pre-commit` blocks staged lines that match phone numbers or the names in `.git/info/private-patterns`, so a private value pasted into a tracked file fails at commit time.
