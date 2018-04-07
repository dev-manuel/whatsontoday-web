import React from 'react'
import {Segment, Container} from 'semantic-ui-react'

export default () => {
    return (
        <Segment vertical>
            <Container text>      
                <h1>Impressum</h1>
                Benjamin Wolba<p>Räcknitzhöhe 15<br/>   
                01217   
                Dresden<br />   
                E-Mail benjamin.wolba@whats-on.today<br />   
                Tel +49 351 46333572<br />   
                </p><strong>
                    Datenschutz
                </strong><p>
                    Die Nutzung unserer Webseite ist in der Regel ohne eine Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adresse) erhoben werden, erfolgt dies – soweit es möglich ist– immer auf freiwilliger Basis. Wir geben Ihre Daten ohne Ihre ausdrückliche Zustimmung nicht an Dritte weiter. Außerdem weisen wir Sie darauf hin, dass die Datenübertragung im Internet (wie beispielsweise bei der Kommunikation über E-Mail) Sicherheitslücken aufweisen kann. Denn ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. Wir widersprechen hiermit ausdrücklich der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien. Die Betreiber dieser Seiten behalten sich ausdrücklich vor, im Fall der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, rechtliche Schritte einzuleiten.
                    <br/><br/>
                    <i><a href="http://www.agb.de">Gratis Impressum von agb.de</a></i>
                </p>
            </Container>
        </Segment>
    )
}