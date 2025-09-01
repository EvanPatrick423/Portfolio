import React, { useState, useEffect, useCallback } from 'react';
import './LibraryWidget.css';

const LibraryWidget = () => {
  // State management
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchType, setSearchType] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    pages: '',
    hasRead: false
  });
  
  // Statistics
  const [stats, setStats] = useState({
    totalBooks: 0,
    readBooks: 0,
    unreadBooks: 0,
    totalPages: 0
  });

  // Load books from localStorage on component mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('libraryBooks');
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks);
        setBooks(parsedBooks);
      } catch (error) {
        console.error('Error parsing saved books:', error);
        localStorage.removeItem('libraryBooks');
      }
    }
  }, []);

  // Save books to localStorage whenever books state changes
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('libraryBooks', JSON.stringify(books));
    }
    updateStats();
  }, [books]);

  // Update statistics
  const updateStats = useCallback(() => {
    const totalBooks = books.length;
    const readBooks = books.filter(book => book.hasRead).length;
    const unreadBooks = totalBooks - readBooks;
    const totalPages = books.reduce((sum, book) => sum + (parseInt(book.pages) || 0), 0);
    
    setStats({
      totalBooks,
      readBooks,
      unreadBooks,
      totalPages
    });
  }, [books]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new book
  const addBook = () => {
    if (!formData.title.trim() || !formData.author.trim()) {
      alert('Please enter both title and author');
      return;
    }

    const newBook = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      author: formData.author.trim(),
      pages: parseInt(formData.pages) || 0,
      hasRead: formData.hasRead,
      dateAdded: new Date().toLocaleDateString()
    };

    setBooks(prev => [...prev, newBook]);
    
    // Clear form
    setFormData({
      title: '',
      author: '',
      pages: '',
      hasRead: false
    });
  };

  // Delete book
  const deleteBook = (bookId) => {
    setBooks(prev => prev.filter(book => book.id !== bookId));
  };

  // Toggle read status
  const toggleReadStatus = (bookId) => {
    setBooks(prev => prev.map(book => 
      book.id === bookId 
        ? { ...book, hasRead: !book.hasRead }
        : book
    ));
  };

  // Search books
  const searchBooks = () => {
    if (!searchType) {
      alert('Please select a search type');
      return;
    }

    const searchValue = formData[searchType];
    if (!searchValue && searchType !== 'hasRead') {
      alert('Please enter a search value');
      return;
    }

    let results = [];
    
    switch (searchType) {
      case 'title':
        results = books.filter(book => 
          book.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      case 'author':
        results = books.filter(book => 
          book.author.toLowerCase().includes(searchValue.toLowerCase())
        );
        break;
      case 'pages':
        const searchPages = parseInt(searchValue);
        results = books.filter(book => book.pages === searchPages);
        break;
      case 'hasRead':
        results = books.filter(book => book.hasRead === formData.hasRead);
        break;
      default:
        results = [];
    }

    setSearchResults(results);
    setIsSearching(true);
  };

  // Clear search
  const clearSearch = () => {
    setSearchResults([]);
    setIsSearching(false);
    setSearchType('');
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to delete all books? This action cannot be undone.')) {
      setBooks([]);
      localStorage.removeItem('libraryBooks');
      clearSearch();
    }
  };

  // Get books to display (search results or all books)
  const displayBooks = isSearching ? searchResults : books;

  return (
    <div className="library-widget">
      <div className="library-header">
        <div className="title-section">
          <h2 className="library-title">📚 Personal Library</h2>
          <p className="library-subtitle">Manage your book collection with ease</p>
        </div>
        
        <div className="stats-section">
          <div className="stat-card">
            <span className="stat-icon">📖</span>
            <div className="stat-info">
              <span className="stat-value">{stats.totalBooks}</span>
              <span className="stat-label">Total Books</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">✅</span>
            <div className="stat-info">
              <span className="stat-value">{stats.readBooks}</span>
              <span className="stat-label">Read</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📝</span>
            <div className="stat-info">
              <span className="stat-value">{stats.unreadBooks}</span>
              <span className="stat-label">Unread</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📄</span>
            <div className="stat-info">
              <span className="stat-value">{stats.totalPages}</span>
              <span className="stat-label">Total Pages</span>
            </div>
          </div>
        </div>
      </div>

      <div className="library-content">
        <div className="control-panel">
          <div className="form-section">
            <h3 className="section-title">📝 Add New Book</h3>
            
            <div className="form-group">
              <label className="form-label">Book Title</label>
              <input
                type="text"
                className="form-input"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter book title..."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-input"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                placeholder="Enter author name..."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Number of Pages</label>
              <input
                type="number"
                className="form-input"
                value={formData.pages}
                onChange={(e) => handleInputChange('pages', e.target.value)}
                placeholder="Enter page count..."
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Reading Status</label>
              <button
                className={`read-toggle ${formData.hasRead ? 'read' : 'unread'}`}
                onClick={() => handleInputChange('hasRead', !formData.hasRead)}
              >
                <span className="toggle-icon">
                  {formData.hasRead ? '✅' : '📖'}
                </span>
                <span className="toggle-text">
                  {formData.hasRead ? 'Read' : 'Not Read'}
                </span>
              </button>
            </div>
            
            <button className="add-book-btn" onClick={addBook}>
              <span className="btn-icon">➕</span>
              <span className="btn-text">Add Book</span>
            </button>
          </div>

          <div className="search-section">
            <h3 className="section-title">🔍 Search Library</h3>
            
            <div className="search-types">
              {[
                { key: 'title', label: 'Title', icon: '📖' },
                { key: 'author', label: 'Author', icon: '👤' },
                { key: 'pages', label: 'Pages', icon: '📄' },
                { key: 'hasRead', label: 'Read Status', icon: '✅' }
              ].map(type => (
                <button
                  key={type.key}
                  className={`search-type-btn ${searchType === type.key ? 'active' : ''}`}
                  onClick={() => setSearchType(type.key)}
                >
                  <span className="btn-icon">{type.icon}</span>
                  <span className="btn-text">{type.label}</span>
                </button>
              ))}
            </div>
            
            <div className="search-actions">
              <button className="search-btn" onClick={searchBooks}>
                <span className="btn-icon">🔍</span>
                <span className="btn-text">Search</span>
              </button>
              
              {isSearching && (
                <button className="clear-search-btn" onClick={clearSearch}>
                  <span className="btn-icon">❌</span>
                  <span className="btn-text">Clear</span>
                </button>
              )}
            </div>
          </div>

          <div className="actions-section">
            <h3 className="section-title">⚙️ Actions</h3>
            
            <button className="danger-btn" onClick={clearAllData}>
              <span className="btn-icon">🗑️</span>
              <span className="btn-text">Clear All Data</span>
            </button>
            
            {isSearching && (
              <div className="search-info">
                <span className="search-results-text">
                  Found {searchResults.length} result(s)
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="books-section">
          <div className="books-header">
            <h3 className="section-title">
              {isSearching ? '🔍 Search Results' : '📚 Your Library'}
            </h3>
            {displayBooks.length > 0 && (
              <span className="books-count">
                {displayBooks.length} book{displayBooks.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <div className="books-container">
            {displayBooks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  {isSearching ? '🔍' : '📚'}
                </div>
                <h4 className="empty-title">
                  {isSearching ? 'No books found' : 'No books yet'}
                </h4>
                <p className="empty-message">
                  {isSearching 
                    ? 'Try adjusting your search criteria'
                    : 'Add your first book to get started'
                  }
                </p>
              </div>
            ) : (
              <div className="books-grid">
                {displayBooks.map(book => (
                  <div key={book.id} className="book-card">
                    <button 
                      className="delete-btn"
                      onClick={() => deleteBook(book.id)}
                      title="Delete book"
                    >
                      ❌
                    </button>
                    
                    <div className="book-info">
                      <h4 className="book-title">{book.title}</h4>
                      <p className="book-author">by {book.author}</p>
                      <p className="book-pages">{book.pages} pages</p>
                      <p className="book-date">Added: {book.dateAdded}</p>
                    </div>
                    
                    <button
                      className={`read-status-btn ${book.hasRead ? 'read' : 'unread'}`}
                      onClick={() => toggleReadStatus(book.id)}
                    >
                      <span className="status-icon">
                        {book.hasRead ? '✅' : '📖'}
                      </span>
                      <span className="status-text">
                        {book.hasRead ? 'Read' : 'Not Read'}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryWidget;
