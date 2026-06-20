import subprocess, os, sys

proj = r'D:\Hermes\workspace\earning\saas\projects\ai-image-studio'
os.chdir(proj)

# commit
r = subprocess.run(['git', 'commit', '-m', 'Fix TS: add children type to layout.tsx'],
    capture_output=True, text=True, timeout=60)
print('commit:', r.returncode)
print(r.stdout.decode('utf-8','replace')[:200])
if r.stderr:
    print(r.stderr.decode('utf-8','replace')[:200])

if r.returncode == 0:
    # push
    r2 = subprocess.run(['git', 'push', 'origin', 'main'],
        capture_output=True, text=True, timeout=60)
    print('push:', r2.returncode)
    print(r2.stdout.decode('utf-8','replace')[:200])
    if r2.stderr:
        print(r2.stderr.decode('utf-8','replace')[:200])
