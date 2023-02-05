# Bjartur Sigurjónsson, Backspace, 3/2/2023

# 60 stig, time limit
s = input()
s = [*s]
n = 0
while n < len(s):
    if s[n] == "<":
        s.pop(n-1)
        s.pop(n-1)
        n-=1
    else:
        n+=1
print("".join([str(x) for x in s]))