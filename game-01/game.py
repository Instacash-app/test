'''
Decisions.  Should it return if the non-integer value is never reached?
(e.g.: [1,4,5,"a","asd"], 6). For now, yes. To switch it so that it raises an
error even if the wrong type is never reached: move if statement that raises
ValueError in line 11 to its own for loop before.  Realistically, it might be
easier/faster to check for typing wherever the array to be passed is being
built.
'''
def sumsTwo(arr, n: int):
    values = set()
    try:
        for i in arr:
            if type(i) != int:
                raise ValueError
            if (n-i) in values:
                return [n-i, i]
            values.add(i)
        return "No answer found."
    except ValueError:
        return "Array must only contain integer values. Error: " + str(type(i))
