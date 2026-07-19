import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { toggleFavorite } from '../../redux/favoriteSlice';

/**
 * FavoriteButton Component
 *
 * @param {Object} props
 * @param {string|number} props.bookId - ID of the book to toggle favorite status
 * @param {string} [props.size='md'] - Button size ('sm', 'md', 'lg')
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.showLabel=true] - Whether to show text label alongside icon
 */
function FavoriteButton({ bookId, size = 'md', className = '', showLabel = true }) {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds || []);

  const isFavorite = favoriteIds.includes(String(bookId));

  const handleToggle = (e) => {
    e.stopPropagation();
    if (bookId !== undefined && bookId !== null) {
      dispatch(toggleFavorite(bookId));
    }
  };

  return (
    <Button
      variant={isFavorite ? 'danger' : 'outline-danger'}
      size={size}
      onClick={handleToggle}
      className={`favorite-btn ${isFavorite ? 'is-favorite' : ''} ${className}`}
      title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    >
      <span className="heart-icon">{isFavorite ? '❤️' : '🤍'}</span>
      {showLabel && (
        <span className="ms-2 favorite-label">
          {isFavorite ? 'Favorited' : 'Add to Favorite'}
        </span>
      )}
    </Button>
  );
}

export default FavoriteButton;
