# Bjartur Sigurjónsson - raðgreining1 - 2/3/2021

n,m=map(int,input().split())
radir=[]
for x in range(m):
    radir.append(input().split())

radir.sort()

runa=["?" for x in range(n)]
a=0
br=False
for i in radir:
    if br:
        break

    a = int(i[0])-1
    for c in i[1]:
        if runa[a] != "?" and runa[a] != c:
            br=True
            break

        runa[a] = c
        a+=1
if br:
    print("Villa")
else:
    s = "".join([str(x) for x in runa])
    print(s)