# Bjartur Sigurjónsson, Háhýsi, 3/2/2023

n,m = map(int, input().split())
print(((m-1) * (n-1) * n * m) // 4 % 1000000007)
