const query = `query MovieQuery($movieId: ID!) {
    guillotine {
        get(key: $movieId) {
            _name
            displayName
            # dataAsJson contains trailer, cast, website, release, subtitle, abstract, and photos
            dataAsJson
            
            # References for images
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
