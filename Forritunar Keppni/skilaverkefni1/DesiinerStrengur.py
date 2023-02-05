s = input()
i = 0
ser = ["a", "e", "i", "o", "u", "y"]
if len(s) > 2:
    if s[0] == "b":
        i = [1 for i in s if i == "r"]
        i = sum(i)
        if i > 1:
            if s[-1] in ser and s[-2] not in ser:
                print("Jebb")

            else:
                print("Neibb")
        else:
            print("Neibb")
    else:
        print("Neibb")
else:
    print("Neibb")