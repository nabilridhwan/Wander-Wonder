const post = [{
        title: "Universal Studios Singapore's hidden gems",
        description: "Singapore's only movie-theme park features 24 rides and attractions, including a pair of dueling coasters that brush past one another in several near misses in their aerial combat. Thrill-seekers",
        author: "TheSingaporeTraveller",
        image_url: require(`../images/singapore/1.png`),
        countryEmoji: "🇸🇬",
        category: "Singapore",
        liked: true,
        location: {
            longitude: 1.2546178494585092,
            latitude: 103.82389221707048,
        },
        nearbyPlaces: [{
                longitude: 1.2491938232200304,
                latitude: 103.82859346068442,
                name: "Sentosa Island"
            },
            {
                longitude: 103.84215470890213,
                latitude: 1.2471772806841352,
                name: "W Singapore - Sentosa Cove Hotel"
            },

            {
                longitude: 1.2491509180953102,
                latitude: 103.82258531262073,
                name: "Palawan Beach"
            }
        ]
    },
    {
        title: "The Adventure Cove experience.",
        description: "Lorem ipsum bla bla bla bla bla",
        author: "TheSingaporeTraveller",
        image_url: require(`../images/singapore/3.png`),
        countryEmoji: "🇸🇬",
        category: "Singapore",
        liked: false,
        location: {
            longitude: 1,
            latitude: 1,
        },
        nearbyPlaces: [{
                longitude: 1.2491938232200304,
                latitude: 103.82859346068442,
                name: "Sentosa Island"
            },
            {
                longitude: 103.84215470890213,
                latitude: 1.2471772806841352,
                name: "W Singapore - Sentosa Cove Hotel"
            },

            {
                longitude: 1.2491509180953102,
                latitude: 103.82258531262073,
                name: "Palawan Beach"
            }
        ]
    },
    {
        title: "Best hotel rooms in Marina Bay Sands",
        description: "Lorem ipsum bla bla bla bla bla",
        author: "LuxurySGTraveller",
        image_url: require(`../images/singapore/2.png`),
        countryEmoji: "🇸🇬",
        category: "Singapore",
        liked: true,
        location: {
            longitude: 1.2849366510860414,
            latitude: 103.86099114577776,
        },
        nearbyPlaces: [{
                longitude: 1.2844861532515155,
                latitude: 103.86006846591485,
                name: "The Shoppes at Marina Bay Sands"
            },

            {
                longitude: 1.2816544507599368,
                latitude: 103.86353387981859,
                name: "Gardens by the Bay"
            },

            {
                longitude: 1.2869834775007585,
                latitude: 103.85446495224355,
                name: "Merlion"
            },
            
            {
                longitude: 1.2879166505851445,
                latitude: 103.86054820203742,
                name: "Helix Bridge"
            },
        ]
    },
    {
        title: "Things you should look out for in S.E.A Aquarium",
        description: "Lorem ipsum bla bla bla bla bla",
        author: "LimChooK",
        image_url: require(`../images/singapore/4.png`),
        countryEmoji: "🇸🇬",
        category: "Singapore",
        liked: false,
        location: {
            longitude: 1,
            latitude: 1,
        },
        nearbyPlaces: [{
            longitude: 1,
            latitude: 0,
            name: "Near Place Bla"
        }]
    },
    {
        title: "Places to look out in New Zealand",
        description: "Lorem ipsum bla bla bla bla bla",
        author: "NewZealanderTraveller",
        image_url: require(`../images/oceania/1.png`),
        countryEmoji: "🇳🇿",
        category: "Oceania",
        liked: false,
        location: {
            longitude: 1,
            latitude: 1,
        },
        nearbyPlaces: [{
            longitude: 1,
            latitude: 0,
            name: "Near Place Bla"
        }]
    },
    {
        title: "The Opera House - Picture spots",
        description: "Lorem ipsum bla bla bla bla bla",
        author: "PhotoHolicGuy23",
        image_url: require(`../images/oceania/2.png`),
        countryEmoji: "🇦🇺",
        category: "Oceania",
        liked: false,
        location: {
            longitude: 1,
            latitude: 1,
        },
        nearbyPlaces: [{
            longitude: 1,
            latitude: 0,
            name: "Near Place Bla"
        }]
    },
    {
        title: "Beijing's Foriden City is 600 years old",
        description: "Lorem ipsum bla bla bla bla bla",
        author: "ChinaTraveller 中国",
        image_url: require(`../images/china/1.png`),
        countryEmoji: "🇨🇳",
        category: "Asia",
        liked: true,
        location: {
            longitude: 1,
            latitude: 1,
        },
        nearbyPlaces: [{
            longitude: 1,
            latitude: 0,
            name: "Near Place Bla"
        }]
    }
]

export default post;