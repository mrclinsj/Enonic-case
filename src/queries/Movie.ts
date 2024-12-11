const query = `query MovieQuery($movieId: ID!) {
    guillotine {
        get(key: $movieId) {
            _name
            displayName
            dataAsJson
            
            _references {
                type
                displayName
                # For media images, retrieve imageUrl and attachments
                ... on media_Image {
                    imageUrl(scale: "width(500)", type: absolute)
                    attachments {
                        name
                    }
                }
            }
        }
    }
}`;

export default query;
