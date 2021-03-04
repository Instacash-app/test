# Decisions Made
Main thing to decide was whether or not the function should return a result regardless of any wrong type element inside the input array, so long as that wrong element was never reached (e.g: [1,2,3,4,5,"asd"], 3).  

I decided that in such case the program would return the result with no errors.  If it instead finds a wrong type before it finds an answer, then it returns ValueError and showcases the wrong type found, as well as indicating the array should contain only integers.

Reason for this is that checking the type of each element to make sure they are int (asuming I do not want to cast to int them when possible), even those that exist after a solution is found, would require to first iterate through the array only to find one such wrong element.  

Compared to the cost of this, it is much quicker/cheaper to simply check for correct types when the array is built (assuming there is a method to do that).

Overall, this implementation should keep O(n) with extra space n.  It iterates through the input array only once, and uses a set (look up O(1) on average) to find previous elements.
