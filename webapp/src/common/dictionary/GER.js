
export default {

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
        success: 'Fast geschafft! Bitte bestätige noch deine E-Mail Adresse.'
    },
    signIn: {
        message: 'Anmelden',        
        email: 'E-Mail Adresse',
        password: 'Passwort',
        rememberMe: 'Eingeloggt bleiben',
        submit: 'Los Geht\'s',
        newToUs: 'Neu bei uns?',
        signUp: 'Registriere dich!',
        errorHeading: 'Anmeldung fehlgeschlagen!',
        errorDescription: 'Nutzername oder Passwort ist falsch'
    }
}