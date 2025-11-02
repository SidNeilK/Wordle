# Question - find the product of array elements not including itself
from typing import List
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        global l_mult, r_mult
        l_mult, r_mult= 1,1
        a=len(nums)
        left_save=[0]*a
        right_save=[0]*a

        for i in range(a):
            j=-i-1
            left_save[i] = l_mult
            right_save[j] = r_mult
            l_mult *= nums[i]
            r_mult *= nums[j]
        final=[]
        for i in range(a):
            final.append(left_save[i]*right_save[i])
        return final
