# Design URL Shortener (like bit.ly)

## Requirements

### Functional
- Given a URL, generate a shorter unique URL
- Redirect short URL to original URL
- Custom short URLs (optional)
- Analytics (optional)

### Non-Functional
- High availability
- Low latency redirects
- Scalable to billions of URLs

## Design

### API Design
```
POST /api/shorten
Body: { "url": "https://example.com/very/long/url" }
Response: { "shortUrl": "https://short.ly/abc123" }

GET /abc123
Response: 301 Redirect to original URL
```

### Database Schema
```sql
CREATE TABLE urls (
    id BIGINT PRIMARY KEY,
    short_code VARCHAR(10) UNIQUE,
    original_url TEXT,
    created_at TIMESTAMP,
    expires_at TIMESTAMP,
    user_id BIGINT,
    click_count INT DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
```

### Key Generation
- Base62 encoding (a-z, A-Z, 0-9) = 62^7 = 3.5 trillion combinations
- Use auto-incrementing ID and encode to base62
- Or use distributed ID generator (Snowflake)

### Architecture Components
1. **API Layer** - Handle requests, load balanced
2. **Cache Layer** - Redis for popular URLs
3. **Database** - PostgreSQL/MySQL for persistence
4. **Analytics Service** - Track clicks, generate stats

### Scale Estimation
- 100M new URLs per month
- Read:Write ratio = 100:1
- Storage: 100M URLs × 500 bytes = 50GB per month
- Cache: Top 20% URLs = 10GB cache needed

## Trade-offs
- Hash collisions vs URL length
- Expiration policy vs storage cost
- Analytics complexity vs system simplicity
