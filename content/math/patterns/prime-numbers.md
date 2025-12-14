# Prime Numbers Pattern

## Description
Prime numbers are natural numbers greater than 1 that have no positive divisors other than 1 and themselves.

## When to Use
- Number theory problems
- Cryptography algorithms
- Factorization problems
- Optimization using prime properties

## Common Algorithms

### Sieve of Eratosthenes
Efficiently finds all primes up to n
```typescript
function sieveOfEratosthenes(n: number): number[] {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    
    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    
    return isPrime
        .map((prime, num) => prime ? num : -1)
        .filter(num => num !== -1);
}
```

### Primality Test
```typescript
function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}
```

**Time Complexity:** 
- Sieve: O(n log log n)
- Primality Test: O(√n)
