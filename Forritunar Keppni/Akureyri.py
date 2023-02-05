# Akureyri, 05/01/2023

n=int(input())
listi={}
for x in range(n):
    nafn = input()
    stad = input()
    if stad in listi.keys():
        listi[stad] += 1
    else:
        listi[stad] = 1

for s in listi:
    print(f"{s} {listi[s]}")