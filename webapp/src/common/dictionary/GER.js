import moment from 'moment'

/**
 * @readonly
 */
export default {
    time: {
        locale: 'de',
        to: 'bis',
    },
    header: {
        blog: 'Blog',
        addEvent : 'Event hinzufügen',
        signIn: 'Anmelden',
        signUp: 'Registrieren',
        signOut: 'Ausloggen',
        // dropdown...
    },
    home: {
        startUp: 'StartUp',
        science: 'Wissenschaft',
        party: 'Party',
        culture: 'Kultur',
        fair: 'Feste'
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

        slogan: 'Finde dein nächstes Event',
        terms: 'AGB',
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
        moreAbout: (x) => `Mehr zu ${x}`,
        contact: (x) => `${x} kontaktieren`,

        also: 'Diese Events könnten dir auch gefallen',
    },
    signUp: {
        message: 'Registriere dich bei What\'s On',
        email: 'E-Mail Adresse',
        password: 'Passwort',
        passwordRepeat: 'Wiederhole das Passwort',
        agree: 'Ich akzieptiere die Nutzungsbedingungen',
        submit: 'Los Geht\'s',
        success: 'Fast geschafft! Bitte bestätige noch deine E-Mail Adresse.',
        alreadyLoggedIn: 'Du bist bereits angemeldet!',
        errorHeading: 'Registrierung Fehlgeschlagen',
        userAlreadyExistsError: 'Es existiert bereits ein nutzer mit dieser E-Mail Adresse',
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
    },
    modal:{
        heading: 'Oooops',
        description: 'Es ist ein Fehler aufgetreten. Versuche es später noch einmal!',
        button: 'Ok',
    },
    confirm:{
        confirmed: 'Deine E-Mail Adresse wurde erfolgreich bestätigt. Du kannst dich nun Anmelden.'
    },
    notFound:{
        message: 'Wir haben leider keine Ergebnisse für diese URL gefunden :('
    },
    noAccess: {
        organizer: 'Du musst als Veranstalter registriert sein, um diese Seite aufrufen zu können.',
        default: 'Du hast leider keine Berechtigung diese Seite aufzurufen.',
    }
}