daemi = input()
n = int(input())
tests = []
for i in range(n):
    timi, nafn, stig = map(str, input().split())
    if nafn == daemi:
        tests.append(int(stig))
if(len(tests)>0):
    print(max(tests))
else:
    print(0)