# bryr / Bridges, 05/01/2023


fjoldiStada, fjoldiVega = map(int, input().split())



class Road():
    def __init__(self, fra, til, bru, parent=None):
        self.parent = parent
        self.fra = fra-1
        self.til = til-1
        self.bru = bru

nodes = []

dist = [1e7] *  fjoldiVega

sptSet = [False] * fjoldiVega


for i in range(fjoldiVega):
    fra, til, ifBru = map(int, input().split())
    nodes.append(Road(fra, til, ifBru))

graph = [[0 for y in range(fjoldiVega)] for i in range(fjoldiVega)]
for n in nodes:
    if n.bru == 0:
        graph[n.fra][n.til] = 1
        graph[n.til][n.fra] = 1
    else:
        graph[n.fra][n.til] = 2

dist[0] = 0

print(graph)
def minDist():

    min = 1e7
    for i in range(fjoldiVega):
        if sptSet[i] == False:
            if dist[i]<=min:
                min = dist[i]
                minind = i
    return minind



for i in range(fjoldiVega):

    u = minDist()
    print("u", u)
    sptSet[u] = True


    for v in range(fjoldiVega):
        if graph[u][v] > 0 and sptSet[v] == False:
            nodes[]
            if dist[v] > dist[u] + graph[u][v]:
                dist[v] = dist[u] + graph[u][v]
print(dist)
print(sptSet)