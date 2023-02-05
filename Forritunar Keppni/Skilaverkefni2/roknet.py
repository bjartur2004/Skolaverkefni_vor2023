# Bjartur Sigurjónsson - roknet - 3/2/2023

n = int(input())
values = {}
for i in range(n):
    sk = input().split()
    if sk[0] == "INNTAK":
        value = False
        if sk[2] == "SATT":
            value = True

        values[sk[1]] = value

    elif sk[0] == "OG":
        values[sk[3]] = values[sk[1]] and values[sk[2]]

    elif sk[0] == "EDA":
        values[sk[3]] =  values[sk[1]] or values[sk[2]]

    elif sk[0] == "EKKI":
        values[sk[2]] = not values[sk[1]]

    elif sk[0] == "UTTAK":
        print(sk[1], "SATT" if values[sk[1]] else "OSATT")
