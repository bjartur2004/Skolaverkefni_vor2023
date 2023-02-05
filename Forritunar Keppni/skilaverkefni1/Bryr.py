n,m=map(int,input().split())


# { nodeIndex:[2, [indx, bru], [indx, bru]] }
unvisited = {}
for x in range(m):
    fra, til, bru = map(int, input().split())
    if(fra in unvisited.keys()):
        unvisited[fra].append([til, bru])
    else:
        unvisited[fra] = [1e7, [til, bru]]

    if(til in unvisited.keys()):
        unvisited[til].append([fra, bru])
    else:
        unvisited[til] = [1e7, [fra, bru]]

    print(unvisited)
    print(unvisited)

unvisited[1] = 0

print(unvisited[1])

def minBryr():
    minIndx = 0
    minBryr = 1e8
    for n in unvisited:
        if(unvisited[n][0] < minBryr):
            minBryr = unvisited[n][0]
            minIndx = n
    return minIndx


for i in range(m):
    current = minBryr()


