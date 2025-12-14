# Valid Palindrome

## Problem Statement
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

## Example
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

## Solution

### Approach: Two Pointers
```typescript
function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}

function isAlphanumeric(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char);
}
```

**Time Complexity:** O(n)  
**Space Complexity:** O(1)
