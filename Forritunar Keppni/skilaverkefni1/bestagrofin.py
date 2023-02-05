# Bjartur Sigurjónsson, 22/02/22 Besta gjöfin beta 2020 A
n=int(input())
l=[]
k=[]
# taka inn nörn og hve skemmtileg gjöfin er
for i in range(n):
    na,g=map(str, input().split())
    l.append(na)
    k.append(int(g))
# tekur hæsta stigið, fengið index á því
# og skrifum svo nafnið með þeim index
print(l[k.index(max(k))])







