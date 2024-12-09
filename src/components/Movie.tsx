import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import MOVIE_QUERY from '../queries/Movie';
import styles from './Movie.module.css';

export function Movie() {
    const { movieId = '' } = useParams();
    const guillotineUrl = import.meta.env.VITE_GUILLOTINE_URL as string;

    const [movie, setMovie] = useState<{
        _name: string;
        displayName: string;
        dataAsJson: {
            trailer?: string;
            cast?: { actor: string; character: string }[];
            website?: string;
            release?: string;
            subtitle?: string;
            abstract?: string;
            photos?: string[];
            imageUrl?: string; // If present, but not strictly needed now
        };
        _references: {
            type: string;
            displayName: string;
            imageUrl?: string;
            attachments?: { name: string }[];
            dataAsJson?: {
                media?: {
                    attachment?: string;
                };
            };
        }[];
    } | null>(null);

    useEffect(() => {
        fetch(guillotineUrl, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                query: MOVIE_QUERY,
                variables: { movieId },
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                const fetchedMovie = json?.data?.guillotine?.get;
                if (fetchedMovie) {
                    setMovie(fetchedMovie);
                } else {
                    console.error('Invalid response structure:', json);
                }
            })
            .catch((err) => console.error('Fetch error:', err));
    }, [movieId, guillotineUrl]);

    if (!movie) {
        return <p>Loading...</p>;
    }

    const { displayName, dataAsJson, _references } = movie;

const firstImageRef = _references?.find(ref => ref.type === 'media:image');
    return (
        <div className={styles.movie}>
            <h1>{displayName}</h1>

            <div className={styles.flexBox}>

        {firstImageRef && (
            <img
                src={firstImageRef.imageUrl}
                alt={firstImageRef.displayName || 'Main Photo'}
                width="500"
                className={styles.movieBanner}
            />
        )}
            <div className={styles.movieInfo}>

            {dataAsJson?.subtitle && <h2>{dataAsJson.subtitle}</h2>}

            {dataAsJson?.release && (
                <p>
                    <strong>Release Date:</strong> {dataAsJson.release}
                </p>
            )}

            {dataAsJson?.abstract && (
                <p>
                    <strong>Abstract:</strong> {dataAsJson.abstract}
                </p>
            )}

            {dataAsJson?.trailer && (
                <p>
                    <strong>Trailer:</strong>{' '}
                    <a href={dataAsJson.trailer} target="_blank" rel="noopener noreferrer">
                        Watch here
                    </a>
                </p>
            )}

            {dataAsJson?.website && (
                <p>
                    <strong>Official Website:</strong>{' '}
                    <a href={dataAsJson.website} target="_blank" rel="noopener noreferrer">
                        Visit
                    </a>
                </p>
            )}

            {dataAsJson?.cast && (
                <div>
                    <h3>Cast</h3>
                    <ul>
                        {dataAsJson.cast.map((member, i) => (
                            <li key={i}>
                                <strong>{member.character}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            </div>
</div>
{_references && _references.length > 0 && (
    <div>
        <h2>Photos</h2>
  <div className={styles.photos}>
    {_references
      .filter(ref => ref.type === 'media:image')
      .slice(1)
      .map((imageRef, i) => (
        <img
          key={i}
          src={imageRef.imageUrl}
          alt={imageRef.displayName || `Photo ${i + 1}`}
          width="500"
          className={styles.photo}
        />
      ))
    }
  </div>
  </div>
)}

            <RouterLink to="/m/" className={styles.backButton}>Back to Movie List</RouterLink>
        </div>
    );
}
