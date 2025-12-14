# Count Primes

## Problem Statement
Given an integer `n`, return the number of prime numbers that are strictly less than `n`.

## Example
```
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10: 2, 3, 5, 7.
```

## Solution

### Approach: Sieve of Eratosthenes
```typescript
function countPrimes(n: number): number {
    if (n <= 2) return 0;
    
    const isPrime = new Array(n).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i < n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    return isPrime.filter(prime => prime).length;
}
```

### Explanation
1. Create a boolean array initialized to true
2. Mark 0 and 1 as not prime
3. For each number i from 2 to √n:
   - If i is prime, mark all multiples of i as not prime
   - Start from i² (smaller multiples already marked)
4. Count remaining true values

**Time Complexity:** O(n log log n)  
**Space Complexity:** O(n)

## Optimization
```typescript
function countPrimes(n: number): number {
    if (n <= 2) return 0;
    
    // Only check odd numbers (except 2)
    let count = n > 2 ? 1 : 0; // Count 2 as prime
    const isPrime = new Array(n).fill(true);
    
    for (let i = 3; i * i < n; i += 2) {
        if (isPrime[i]) {
            for (let j = i * i; j < n; j += i * 2) {
                isPrime[j] = false;
            }
        }
    }
    
    for (let i = 3; i < n; i += 2) {
        if (isPrime[i]) count++;
    }
    
    return count;
}
```
