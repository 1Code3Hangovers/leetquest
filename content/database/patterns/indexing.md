# Database Indexing Pattern

## Description
Database indexes improve query performance by creating data structures that allow faster data retrieval at the cost of additional storage and slower writes.

## When to Use
- Frequent queries on specific columns
- Large tables with slow query performance
- Columns used in WHERE, JOIN, ORDER BY clauses
- Unique constraints needed

## Index Types
1. **B-Tree Index** - Default, good for range queries
2. **Hash Index** - Fast equality lookups
3. **Composite Index** - Multiple columns
4. **Full-Text Index** - Text search
5. **GiST/GIN** - PostgreSQL special indexes

## Best Practices
- Index foreign keys
- Index columns in WHERE clauses
- Use composite indexes wisely (order matters)
- Don't over-index (slows writes)
- Monitor index usage

## Example
```sql
-- Single column index
CREATE INDEX idx_user_email ON users(email);

-- Composite index
CREATE INDEX idx_user_name ON users(last_name, first_name);

-- Unique index
CREATE UNIQUE INDEX idx_username ON users(username);
```
