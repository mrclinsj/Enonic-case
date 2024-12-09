import type {RichTextData} from '@enonic/react-components';
import {RichText} from '@enonic/react-components';
import {useEffect, useState} from 'react';
import {Link as RouterLink, useParams} from 'react-router-dom';
import PERSON_QUERY from '../queries/Person';
import styles from './Person.module.css';
import {Link} from './Link';
import {Image} from './Image';
import {Macro} from './Macro';

interface RestProps {
    personID: string;
    [key: string]: unknown;
}

export function Person() {
    const {
        // name,
        personId = ''
    } = useParams();

    const guillotineUrl = import.meta.env.VITE_GUILLOTINE_URL as string;

    const [data, setData] = useState<{
        _name: string
        data: {
            bio: RichTextData
            dateofbirth: string
            photos: {
                imageUrl: string
            }[]
        }
        displayName: string
    }>();

    useEffect(() => {
        fetch(guillotineUrl, {
            body: JSON.stringify({
                query: PERSON_QUERY,
                variables: {
                    personId,
                }
            }),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        })
            .then(response => response.json())
            .then(json => {
                const value = json.data.guillotine.get;
                setData(value)
            });
    }, []); // useEffect

    if (!data) {
        return null;
    }

    const {
        data: {
            bio,
            photos
        },
        displayName
    } = data;
    console.log(data.data.photos)


    
    return (
        <>
            <div className={styles.person}>
                <h1>{displayName}</h1>



                <RichText<RestProps>
                    className={styles.bio}
                    Image={Image}
                    data={bio}
                    tag="article"
                    Link={Link}
                    Macro={Macro}
                    personID="paramValue"
                />
                {photos.length > 0 && <h2 className={styles.photosheader}>Photos</h2>}
                <div className={styles.photos}>
    {photos.map((photo, i) => (
        <img
            key={i}
            src={photo.imageUrl}
            title={getTitle(photo, displayName)}
            alt={getTitle(photo, displayName)}
            width="500"
            className={
                getTitle(photo, displayName).toLowerCase().includes("wachowskis")
                    ? `wachowskisImage`
                    : styles.photo
            }
        />
    ))}
</div>

            <RouterLink to="/p/" className={styles.backButton}>
                Back to list
            </RouterLink>
            </div>
        </>
    );
}

function getTitle(photo: any, displayName: string) {
    return (photo.attachments || [])[0].name || displayName;
}