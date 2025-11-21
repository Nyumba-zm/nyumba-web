# 🔧 Nyumba Backend Architecture Blueprint

## 🎯 Overview

This is your complete backend architecture guide for Nyumba. While we're starting with the frontend, this blueprint ensures your backend will be production-ready when you build it.

**Tech Stack**: FastAPI + PostgreSQL + Docker

---

## 📁 Backend Project Structure

```
nyumba-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # FastAPI application entry
│   ├── config.py                  # Configuration management
│   │
│   ├── api/                       # API routes
│   │   ├── __init__.py
│   │   ├── deps.py                # Dependencies (auth, db)
│   │   └── v1/                    # API version 1
│   │       ├── __init__.py
│   │       ├── router.py          # Main router
│   │       ├── properties.py      # Property endpoints
│   │       ├── auth.py            # Auth endpoints
│   │       ├── users.py           # User endpoints
│   │       ├── agents.py          # Agent endpoints
│   │       └── uploads.py         # File upload endpoints
│   │
│   ├── core/                      # Core functionality
│   │   ├── __init__.py
│   │   ├── security.py            # Password hashing, JWT
│   │   ├── config.py              # Settings management
│   │   └── dependencies.py        # Shared dependencies
│   │
│   ├── db/                        # Database
│   │   ├── __init__.py
│   │   ├── base.py                # Base class
│   │   ├── session.py             # Database session
│   │   └── init_db.py             # Database initialization
│   │
│   ├── models/                    # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── property.py
│   │   ├── image.py
│   │   ├── amenity.py
│   │   └── saved_property.py
│   │
│   ├── schemas/                   # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── property.py
│   │   ├── auth.py
│   │   └── common.py
│   │
│   ├── crud/                      # CRUD operations
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── user.py
│   │   ├── property.py
│   │   └── saved_property.py
│   │
│   ├── services/                  # Business logic
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── property_service.py
│   │   ├── upload_service.py
│   │   └── email_service.py
│   │
│   └── utils/                     # Utilities
│       ├── __init__.py
│       ├── formatters.py
│       └── validators.py
│
├── alembic/                       # Database migrations
│   ├── versions/
│   └── env.py
│
├── tests/                         # Tests
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_properties.py
│   └── test_auth.py
│
├── .env                          # Environment variables
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── pyproject.toml
└── README.md
```

---

## 🗃️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(20),
    avatar VARCHAR(500),
    role VARCHAR(20) NOT NULL CHECK (role IN ('buyer', 'seller', 'agent', 'admin')),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### Properties Table
```sql
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    property_type VARCHAR(50) NOT NULL,
    listing_type VARCHAR(20) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    square_meters INTEGER,
    address TEXT,
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    status VARCHAR(20) DEFAULT 'active',
    year_built INTEGER,
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_city ON properties(city);
CREATE INDEX idx_properties_neighborhood ON properties(neighborhood);
```

### Property Images Table
```sql
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_property_images_property_id ON property_images(property_id);
```

### Amenities Table
```sql
CREATE TABLE amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_amenities_property_id ON amenities(property_id);
```

### Features Table
```sql
CREATE TABLE features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_features_property_id ON features(property_id);
```

### Saved Properties Table
```sql
CREATE TABLE saved_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

CREATE INDEX idx_saved_properties_user_id ON saved_properties(user_id);
CREATE INDEX idx_saved_properties_property_id ON saved_properties(property_id);
```

### Agent Profiles Table
```sql
CREATE TABLE agent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255),
    license VARCHAR(100) UNIQUE NOT NULL,
    specializations TEXT[],
    rating DECIMAL(3, 2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    properties_sold INTEGER DEFAULT 0,
    bio TEXT,
    website VARCHAR(500),
    facebook VARCHAR(255),
    twitter VARCHAR(255),
    linkedin VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_agent_profiles_user_id ON agent_profiles(user_id);
```

---

## 🔐 Authentication Flow

### JWT Configuration
```python
# app/core/security.py
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your-secret-key-here"  # From environment
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
```

---

## 🛣️ API Endpoints

### Authentication
```python
POST   /api/v1/auth/register          # Register new user
POST   /api/v1/auth/login             # Login
POST   /api/v1/auth/logout            # Logout
POST   /api/v1/auth/refresh           # Refresh token
GET    /api/v1/auth/me                # Get current user
POST   /api/v1/auth/verify-email      # Verify email
POST   /api/v1/auth/forgot-password   # Request password reset
POST   /api/v1/auth/reset-password    # Reset password
```

### Properties
```python
GET    /api/v1/properties             # List properties (with filters)
GET    /api/v1/properties/{id}        # Get single property
POST   /api/v1/properties             # Create property (auth required)
PUT    /api/v1/properties/{id}        # Update property (auth required)
DELETE /api/v1/properties/{id}        # Delete property (auth required)
GET    /api/v1/properties/featured    # Get featured properties
GET    /api/v1/properties/trending    # Get trending properties
GET    /api/v1/properties/{id}/similar # Get similar properties
POST   /api/v1/properties/{id}/view   # Increment view count
```

### Property Images
```python
POST   /api/v1/properties/{id}/images        # Upload images
DELETE /api/v1/properties/{id}/images/{img_id} # Delete image
PUT    /api/v1/properties/{id}/images/{img_id}/primary # Set as primary
```

### Saved Properties
```python
POST   /api/v1/properties/{id}/save   # Save property
DELETE /api/v1/properties/{id}/save   # Unsave property
GET    /api/v1/users/me/saved         # Get saved properties
```

### Users
```python
GET    /api/v1/users/me               # Get current user profile
PUT    /api/v1/users/me               # Update profile
GET    /api/v1/users/{id}/properties  # Get user's properties
```

### Agents
```python
GET    /api/v1/agents                 # List agents
GET    /api/v1/agents/{id}            # Get agent profile
GET    /api/v1/agents/{id}/properties # Get agent's properties
POST   /api/v1/agents/profile         # Create agent profile
PUT    /api/v1/agents/profile         # Update agent profile
```

---

## 🔧 Example Implementation

### Property Model (SQLAlchemy)
```python
# app/models/property.py
from sqlalchemy import Column, String, Integer, Float, Boolean, ForeignKey, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from app.db.base import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(String)
    property_type = Column(String(50), nullable=False)
    listing_type = Column(String(20), nullable=False)
    price = Column(Float, nullable=False)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    square_meters = Column(Integer)
    address = Column(String)
    neighborhood = Column(String(100))
    city = Column(String(100))
    latitude = Column(Float)
    longitude = Column(Float)
    status = Column(String(20), default="active")
    year_built = Column(Integer)
    view_count = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="properties")
    images = relationship("PropertyImage", back_populates="property", cascade="all, delete-orphan")
    amenities = relationship("Amenity", back_populates="property", cascade="all, delete-orphan")
    features = relationship("Feature", back_populates="property", cascade="all, delete-orphan")
```

### Property Schema (Pydantic)
```python
# app/schemas/property.py
from pydantic import BaseModel, UUID4
from typing import Optional, List
from datetime import datetime
from enum import Enum

class PropertyType(str, Enum):
    HOUSE = "house"
    APARTMENT = "apartment"
    TOWNHOUSE = "townhouse"
    LAND = "land"
    COMMERCIAL = "commercial"

class ListingType(str, Enum):
    SALE = "sale"
    RENT = "rent"

class PropertyBase(BaseModel):
    title: str
    description: Optional[str] = None
    property_type: PropertyType
    listing_type: ListingType
    price: float
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    square_meters: Optional[int] = None
    address: Optional[str] = None
    neighborhood: Optional[str] = None
    city: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class PropertyCreate(PropertyBase):
    amenities: Optional[List[str]] = []
    features: Optional[List[str]] = []

class PropertyUpdate(PropertyBase):
    title: Optional[str] = None
    price: Optional[float] = None
    city: Optional[str] = None

class PropertyInDB(PropertyBase):
    id: UUID4
    user_id: UUID4
    status: str
    view_count: int
    is_featured: bool
    created_at: datetime
    updated_at: datetime
    images: List[dict] = []
    amenities: List[str] = []
    features: List[str] = []

    class Config:
        from_attributes = True
```

### Property CRUD
```python
# app/crud/property.py
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_

from app.models.property import Property
from app.schemas.property import PropertyCreate, PropertyUpdate

class CRUDProperty:
    def get(self, db: Session, id: str) -> Optional[Property]:
        return db.query(Property).filter(Property.id == id).first()

    def get_multi(
        self,
        db: Session,
        skip: int = 0,
        limit: int = 100,
        filters: dict = None
    ) -> List[Property]:
        query = db.query(Property).filter(Property.status == "active")
        
        if filters:
            if filters.get("property_type"):
                query = query.filter(Property.property_type.in_(filters["property_type"]))
            if filters.get("price_min"):
                query = query.filter(Property.price >= filters["price_min"])
            if filters.get("price_max"):
                query = query.filter(Property.price <= filters["price_max"])
            if filters.get("bedrooms"):
                query = query.filter(Property.bedrooms.in_(filters["bedrooms"]))
            if filters.get("city"):
                query = query.filter(Property.city == filters["city"])
            if filters.get("search"):
                search = f"%{filters['search']}%"
                query = query.filter(
                    or_(
                        Property.title.ilike(search),
                        Property.description.ilike(search),
                        Property.address.ilike(search)
                    )
                )
        
        return query.offset(skip).limit(limit).all()

    def create(self, db: Session, obj_in: PropertyCreate, user_id: str) -> Property:
        db_obj = Property(
            **obj_in.dict(exclude={"amenities", "features"}),
            user_id=user_id
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        db_obj: Property,
        obj_in: PropertyUpdate
    ) -> Property:
        update_data = obj_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, id: str) -> Property:
        obj = db.query(Property).get(id)
        db.delete(obj)
        db.commit()
        return obj

property = CRUDProperty()
```

### Property Endpoints
```python
# app/api/v1/properties.py
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.crud import property as property_crud
from app.schemas.property import PropertyCreate, PropertyUpdate, PropertyInDB
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[PropertyInDB])
def get_properties(
    skip: int = 0,
    limit: int = 100,
    property_type: List[str] = Query(None),
    price_min: float = Query(None),
    price_max: float = Query(None),
    bedrooms: List[int] = Query(None),
    city: str = Query(None),
    search: str = Query(None),
    db: Session = Depends(get_db)
):
    """Get all properties with optional filters"""
    filters = {
        "property_type": property_type,
        "price_min": price_min,
        "price_max": price_max,
        "bedrooms": bedrooms,
        "city": city,
        "search": search
    }
    properties = property_crud.property.get_multi(
        db, skip=skip, limit=limit, filters=filters
    )
    return properties

@router.get("/{property_id}", response_model=PropertyInDB)
def get_property(
    property_id: str,
    db: Session = Depends(get_db)
):
    """Get single property by ID"""
    property = property_crud.property.get(db, id=property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property

@router.post("/", response_model=PropertyInDB)
def create_property(
    property_in: PropertyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create new property listing"""
    property = property_crud.property.create(
        db, obj_in=property_in, user_id=current_user.id
    )
    return property

@router.put("/{property_id}", response_model=PropertyInDB)
def update_property(
    property_id: str,
    property_in: PropertyUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update property listing"""
    property = property_crud.property.get(db, id=property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    if property.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    property = property_crud.property.update(db, db_obj=property, obj_in=property_in)
    return property

@router.delete("/{property_id}")
def delete_property(
    property_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete property listing"""
    property = property_crud.property.get(db, id=property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    if property.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    property_crud.property.delete(db, id=property_id)
    return {"message": "Property deleted successfully"}
```

---

## 🚀 Quick Start Commands

### Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic python-jose[cryptography] passlib[bcrypt] python-multipart

# Initialize database
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

# Run server
uvicorn app.main:app --reload --port 8000
```

### Docker
```bash
# Build and run with Docker Compose
docker-compose up -d

# Run migrations
docker-compose exec api alembic upgrade head

# View logs
docker-compose logs -f api
```

---

## 📦 Requirements.txt

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
alembic==1.12.1
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
pydantic[email]==2.5.0
pydantic-settings==2.1.0
boto3==1.29.7  # For AWS S3
python-dotenv==1.0.0
```

---

## 🐳 Docker Configuration

### Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: nyumba
      POSTGRES_PASSWORD: your_password
      POSTGRES_DB: nyumba_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build: .
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://nyumba:your_password@db:5432/nyumba_db
      SECRET_KEY: your-secret-key-here
    depends_on:
      - db

volumes:
  postgres_data:
```

---

## 🎯 Next Steps

1. **Week 3-4**: Implement this backend
2. **Week 5**: Connect frontend to backend
3. **Week 6**: Test, deploy, launch

This blueprint gives you everything you need to build a production-ready backend when you're ready!

---

*Complete Backend Implementation Guide*
*Nyumba Platform - Professional Grade*
