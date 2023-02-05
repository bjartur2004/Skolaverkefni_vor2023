# Bjartur Sigurjónsson, Arrangement, 05/01/2023
room = int(input())
teams = int(input())

extras = teams % room
for i in range(room):
    n = teams // room
    if i < extras:
        n += 1

    print("*" * n)
