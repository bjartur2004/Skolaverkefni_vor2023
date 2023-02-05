N = int(input())
M = int(input())

daemi = input().split()

lidastig=[]
for i in range(M):
    lidastig.append([int(n) for n in input().split()])

daemiStig = [0 for i in range(N)]
for l in lidastig:
    for i, s in enumerate(l):
        daemiStig[i] += s

print(daemi[daemiStig.index(max(daemiStig))])