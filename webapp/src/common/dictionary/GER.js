import moment from 'moment'

/**
 * @readonly
 */
export default {
    categories: {
        all: 'Alle',
        culture: 'Kultur',
        startup: 'Startup',
        club: 'Club',
        dance: 'Tanzen',
        festivals: 'Festivals',
        rock: 'Rock', 
        'heavy metall': 'Heavy Metal',
        hiphop: 'Hiphop',
        rnb: 'RnB',
        jazz: 'Jazz',
        pop: 'Pop',
        'folk music': 'Volksmusik',
        classic: 'Klassische Musik',
        reading: 'Lesung',
        opera: 'Oper',
        theater: 'Theater',
        musical: 'Musical',
        show: 'Show',
        exhibition: 'Ausstellung',
        science: 'Wissenschaft',
        lecture: 'Vorlesung',
        meetup: 'Meetup',
    },
    externalLinks: {
        facebook: 'https://www.facebook.com/findyournextevent/',
        instagram: 'https://www.instagram.com/findyournextevent/',
        twitter: 'https://twitter.com/yournextevent',
    },
    deleteMessage: {
        yes: 'Ja',
        no: 'Nein',
    },
    time: {
        locale: 'de',
        to: 'bis',
        time: 'Uhrzeit'
    },
    header: {
        blog: 'Blog',
        forOrganizers : 'Für Veranstalter',
        signIn: 'Anmelden',
        signUp: 'Registrieren',
        signOut: 'Ausloggen',
        options: 'Profil verwalten',
        // dropdown...
    },
    home: {
        startUp: 'StartUp',
        science: 'Wissenschaft',
        party: 'Party',
        culture: 'Kultur',
        fair: 'Feste',
        
        search: 'Suche',
        city: 'Stadt',
        category: 'Kategorie',
        submit: 'Los geht\'s!',

        slogan: 'Finde dein nächstes Event!',
    },
    footer: {
        socialMedia: 'Social Media',
        facebook: 'Facebook',
        twitter: 'Twitter',
        instagram: 'Instagram',

        about: 'Über uns',
        contactUs: 'Kontakt',
        theTeam: 'Das Team',
        faq: 'FAQ',

        slogan: 'Finde dein nächstes Event!',
        terms: 'AGB',
        siteNotice: 'Impressum',
        privacyPolicy: 'Datenschutzerklärung'
    },
    serp:{
        what: 'Was?',
        when: 'Wann?',
        where: 'Wo?',
        noResults: 'Wir haben leider keine Ergebnisse für deine Suche finden können...'
    },
    event: {
        what: 'Was?',
        when: 'Wann?',
        where: 'Wo?',
        cost: 'Kosten',
        moreInformation: 'Weitere Informationen',
        location: 'Veranstaltungsort',
        moreAbout: (x) => `Mehr zu ${x}`,
        contact: (x) => `${x} kontaktieren`,

        also: 'Diese Events könnten dir auch gefallen',
    },
    signUp: {
        message: 'Registriere dich bei What\'s On',
        email: 'E-Mail Adresse',
        password: 'Passwort',
        passwordRepeat: 'Wiederhole das Passwort',
        agree: 'Ich akzeptiere die Nutzungsbedingungen',
        submit: 'Los Geht\'s',
        success: 'Fast geschafft! Bitte bestätige noch deine E-Mail Adresse.',
        alreadyLoggedIn: 'Du bist bereits angemeldet!',
        errorHeading: 'Registrierung fehlgeschlagen',
        userAlreadyExistsError: 'Es existiert bereits ein Nutzer mit dieser E-Mail Adresse',
        signUpAsOrganizer: 'Als Veranstalter registrieren',
        signUpAsUser: 'Als Nutzer registrieren',
        organizerNamePlaceholder: 'Name',
    },
    signIn: {
        message: 'Anmelden',
        redirectMessage: 'Du musst angemeldet sein um diese Seite zu besuchen',       
        email: 'E-Mail Adresse',
        password: 'Passwort',
        rememberMe: 'Eingeloggt bleiben',
        submit: 'Los Geht\'s',
        newToUs: 'Neu bei uns?',
        signUp: 'Registriere dich!',
        errorHeading: 'Anmeldung fehlgeschlagen!',
        errorDescription: 'Nutzername oder Passwort ist falsch', 
        alreadyLoggedIn: 'Du bist bereits angemeldet!',
    },
    options: {
        options: 'Einstellungen',
        here: 'Hier',
        yes: 'Ja',
        no: 'Nein',

        newPassword: 'Neues Passwort festlegen:',

        deleteAccount: 'Account löschen:',
        deleteAccountMessage: 'Möchtest du deinen Account wirklich löschen?',
        deleteAccountDescription: 'Wenn du mit "Ja" bestätigst wird dein Account unwideruflich gelöscht!',
        changePassword: {
            password: 'Passwort',
            passwordRepeat: 'Passwort wiederholen',
            submit: 'Passwort ändern',
            error: {
                password: {
                    heading: 'Ändern des Passwort fehlgeschlagen!',
                    description: 'Passwort zu kurz'
                },
                match : {
                    heading: 'Ändern des Passwort fehlgeschlagen!',
                    description: 'Passwörter stimmen nicht überein'
                }
            },
            modal:{
                heading: 'Passwort geändert',
                description: 'Dein Passwort wurde erfolgreich geändert!',
                button: 'Ok'
            }
        }
    },
    modal:{
        heading: 'Oooops',
        description: 'Es ist ein Fehler aufgetreten. Versuche es später noch einmal!',
        button: 'Ok',
    },
    confirm:{
        confirmed: 'Deine E-Mail Adresse wurde erfolgreich bestätigt. Du kannst dich nun anmelden.'
    },
    notFound:{
        message: 'Wir haben leider keine Ergebnisse für diese URL gefunden :('
    },
    noAccess: {
        backToHome: 'Zurück zur Startseite',
        organizer: 'Du musst als Veranstalter registriert sein, um diese Seite aufrufen zu können.',
        default: 'Du hast leider keine Berechtigung diese Seite aufzurufen.',
    },
    forOrganizers: {
        forOrganizers: 'Für Veranstalter',
        createEvent: 'Event hinzufügen',
        crateLocation: 'Location hinzufügen',
        dashboard: 'Dashboard',
    },
    eventTool: {
        create: {
            noResults: 'Keine Ergebnisse gefunden...',
            addEvent: 'Neues Event hinzufügen',
            name: 'Titel',
            namePlaceholder: 'Bitte gib einen Titel ein...',
            categories: 'Kategorien',
            categoriesPlaceholder: 'Bitte Kategorien auswählen...',
            from: 'Beginn',
            fromPlaceholder: 'Bitte wähle ein Datum und Uhrzeit aus...',
            to: 'Ende',
            toPlaceholder: 'Bitte wähle ein Datum und Uhrzeit aus...',
            location: 'Veranstaltungsort',
            locationPlaceholder: 'Bitte wähle eine Location aus',
            createNewLocation: 'Neue Location hinzufügen',
            images: 'Bilder',
            thumbnailImageUploadButtonAddImage: 'Thumbnail hinzufügen',
            thumbnailImageNoFileSelected: 'Keine Datei ausgewählt',
            sliderImageUploadButtonAddImage: 'Bild hinzufügen',
            sliderImageFileTableFileName: 'Dateiname',
            sliderImageFileTableIsUploaded: 'Hochgeladen',
            uploadThumbnail: 'Thumbnail hochladen',
            uploadSliderImages: 'Bilder hochladen',            
            copyright: 'Copyright',
            copyrightPlaceholder: 'Bitte hier eingeben...',
            description: 'Beschreibung',
            descriptionPlaceholder: 'Bitte gib einen Text ein...',
            shortDescriptionPlaceholder: 'Bitte gib einen Text ein...',
            shortDescription: 'Kurzbeschreibung',
            submit: 'Abschicken',
            back: 'Zurück',
        },
        update: {
            hint: 'Nicht wundern! Kategorien, Location und Bilder des Events werden hier nicht angezeigt! Fülle einfach die entsprechenden Felder aus, um die aktuellen Werte zu überschreiben.',
            noResults: 'Keine Ergebnisse gefunden...',
            updateEvent: 'Event bearbeiten',
            name: 'Titel',
            namePlaceholder: 'Bitte gib einen Title ein...',
            categories: 'Kategorien',
            categoriesPlaceholder: 'Bitte Kategorien auswählen...',
            from: 'Beginn',
            fromPlaceholder: 'Bitte wähle ein Datum und Uhrzeit aus...',
            to: 'Ende',
            toPlaceholder: 'Bitte wähle ein Datum und Uhrzeit aus...',
            location: 'Veranstaltungsort',
            locationPlaceholder: 'Bitte wähle eine Location aus',
            createNewLocation: 'Neue Location hinzufügen',
            images: 'Bilder',
            thumbnailImageUploadButtonAddImage: 'Thumbnail hinzufügen',
            thumbnailImageNoFileSelected: 'Keine Datei ausgewählt',
            sliderImageUploadButtonAddImage: 'Bild hinzufügen',
            sliderImageFileTableFileName: 'Dateiname',
            sliderImageFileTableIsUploaded: 'Hochgeladen',
            uploadThumbnail: 'Thumbnail hochladen',
            uploadSliderImages: 'Bilder hochladen',            
            copyright: 'Copyright',
            copyrightPlaceholder: 'Bitte hier eingeben...',
            description: 'Beschreibung',
            descriptionPlaceholder: 'Bitte gib einen Text ein...',
            shortDescriptionPlaceholder: 'Bitte gib einen Text ein...',
            shortDescription: 'Kurzbeschreibung',
            submit: 'Abschicken',
            back: 'Zurück',
        },
        delete: {
            deleteEventMessage: 'Möchtest du das Event wirklich löschen?',
            deleteEventDescription: 'Wenn du mit "Ja" bestätigst wird das Event unwideruflich gelöscht!',
        },
        dashboard: {
            dashboard: 'Dashboard',
            id: 'Id',
            name: 'Name',
            back: 'Zurück',
        },
        successful: {
            createEvent: 'Du hast ein Event erfolgreich erstellt!',
            updateEvent: 'Du hast ein Event erfolgreich bearbeitet!',
            deleteEvent: 'Das Event wurde erfolgreich gelöscht.',
            default: 'Aktion erfolgreich ausgeführt',

            goBack: 'Zurück'
        },
    },
    locationTool: {
        create: {
            name: 'Name',
            namePlaceholder: 'Bitte gib den Namen der Location ein...',
            street: 'Straße',
            streetPlaceholder: 'Bitte gib die Straße ein...',
            city: 'Stadt',
            cityPlaceholder: 'Bitte gib die Stadt ein...',
            country: 'Land',
            countryPlaceholder: 'Bitte gib das Land ein...',
            website: 'Website',
            websitePlaceholder: 'Bitte gib die Webadresse ein...',
            comment: 'Beschreibung',
            commentPlaceholder: 'Bitte gib eine kurze Beschreibung ein...',
            submit: 'Abschicken',
            back: 'zurück',
            extra: 'Extra Informationen',
        },
        successful: {
            createLocation: 'Du hast erfolgreich eine Location erstellt!',
            default: 'Aktion erfolgreich ausgeführt',

            goBack: 'Zurück'
        },
    },
}
