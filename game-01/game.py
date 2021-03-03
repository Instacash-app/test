'''
Decisions.  Should it return if the non-integer value is never reached? (e.g.: [1,4,5,"a","asd"], 6). For now, no.
'''
def sumsTwo(arr, n: int):
    values = set()
    try:
        for i in arr:
            if type(i) != int:
                raise ValueError
        for i in arr:
            if (n-i) in values:
                return [n-i, i]
            values.add(i)
        return [0]
    except ValueError:
        return "Array must only contain integer values. Error: " + str(type(i))

print(sumsTwo([1,2,3,4,5,6,7,"10"],10))
