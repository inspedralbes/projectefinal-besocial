import React, { useState } from "react";
import 'leaflet/dist/leaflet.css';
import Header from "../Components/Header";

export default function Blog() {
  const [activeComponent, setActiveComponent] = useState('Eng');

  function handleChecked(lang) {
    if (lang == "Eng") {
      setActiveComponent("Eng");
      document.getElementById("tab1").checked = true;
      document.getElementById("tab2").checked = false;
    } else if (lang == "Cat") {
      setActiveComponent("Cat");
      document.getElementById("tab1").checked = false;
      document.getElementById("tab2").checked = true;
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="text-neutral-50">
        <div className="w-[280px] m-auto relative flex rounded-[50px] bg-[#732592] mt-6">
          <input type="radio" name="tabs" id="tab1" defaultChecked></input>
          <div className="tab-label-content" id="tab1-content">
            <label htmlFor="tab1" onClick={() => handleChecked("Eng")}>English</label>
          </div>
          <input type="radio" name="tabs" id="tab2"></input>
          <div className="tab-label-content" id="tab2-content">
            <label htmlFor="tab2" onClick={() => handleChecked("Cat")}>Català</label>
          </div>
          <div className="slide"></div>
        </div>

        {activeComponent == "Eng" ? (
          <>
            <h1 className="my-0 mx-auto mt-8 text-[40px] font-bold w-[80%]">Blog</h1>
            <hr></hr>
            <div className="my-9 mx-auto w-[80%]">
              <h3 className="text-[28px] font-semibold mb-4">Why it is beneficial to go out partying</h3>
              <p>The idea of ​​partying is often seen by many as an unhealthy habit, however, there are several benefits of partying that often go unnoticed.

                <br /><br />First of all, going out can be a great way to socialize. It's an opportunity to meet new people, share experiences and connect with people who share similar interests. In addition, music and dancing are excellent ways to release tension and enjoy a relaxed atmosphere.

                <br /><br />On the other hand, partying can also be beneficial for mental health. At these events, people can disconnect from everyday worries, allowing them to release their accumulated stress and anxiety. Music, fun and the adrenaline released by dancing and laughing can act as a kind of emotional therapy, improving mood and lowering cortisol levels.

                <br /><br />Finally, partying can also be an opportunity to experience new things and develop social skills. For example, it can be an opportunity to practice effective communication, time management and organization, skills that can be applied to everyday life.

                <br /><br />In conclusion, partying can not only be a way to have fun and enjoy life, but also a way to socialize, reduce stress and experience new things. As long as it's done responsibly, partying can be a healthy habit that can have many benefits for your physical and mental health.</p>
            </div>
            <hr></hr>
            <div className="my-9 mx-auto w-[80%]">
              <h3 className="text-[28px] font-semibold mb-4">The parties in the digital age</h3>
              <p>
                Social media and technology have changed the way parties are organized and shared. Today, most people use social media to find out about events and to share photos and videos of the parties they attend.

                <br /><br />Social networks have become an essential tool for organizing events. Party organizers can create events in Be Social or send email invitations for guests to RSVP. In addition, social media allows guests to share information about the party with friends and family, which can increase attendance.

                <br /><br />Social media also allows guests to share party photos and videos in real time. Party organizers can create party-specific hashtags for guests to tag their photos and videos with. This allows people who were unable to attend the party to see what happened and feel part of the experience.

                <br /><br />Technology has also changed the way music is listened to and shared at parties. Instead of carrying around loads of CDs or bulky stereos, party organizers can use apps like Spotify or Apple Music to create custom playlists and play them on Bluetooth speakers.

                <br /><br />In conclusion, social networks and technology have changed the way parties are organized and shared. Social media allows greater interaction between party organizers and guests, and technology allows more flexibility in music selection and playback. Without a doubt, parties in the digital age have evolved and become more accessible and interactive thanks to technology and social media.
              </p>
            </div>
            <hr></hr>
            <div className="my-9 mx-auto w-[80%]">
              <h3 className="text-[28px] font-semibold mb-4">Security at parties</h3>
              <p>
                Security at parties is a very important issue that must be approached responsibly. Accidents or problems can happen at parties, especially when there are a lot of people and alcohol involved. For this reason, it is essential to take measures to ensure the safety of attendees and prevent any type of problem.

                <br /><br />One of the most important steps you can take is to hire capable and experienced security personnel. These people can supervise the entrance and exit of the party, monitor the behavior of the attendees and prevent any kind of conflict or problem. They can also act quickly in an emergency and provide medical assistance if needed.

                <br /><br />Another important measure is to avoid excessive alcohol consumption. This can be done by controlling the amount of alcohol served and offering non-alcoholic options. It's also important to educate guests about the dangers of excessive alcohol consumption and provide alternatives so they can have fun without drinking.

                <br /><br />In addition, it is important to take into account the physical security of the place where the party is held. Party organizers should ensure that the venue has enough space for guests and that emergency exits are clearly marked. It is also important to check that the electrical and lighting installations are in good condition to prevent accidents.

                <br /><br />In conclusion, security at parties is essential and must be taken seriously. By hiring capable security personnel, controlling alcohol consumption, educating guests, and ensuring the physical security of the venue, you can ensure a fun and safe party for all attendees.
              </p>
            </div>
            <hr></hr>
            <div className="my-9 mx-auto w-[80%]">
              <h3 className="text-[28px] font-semibold mb-4">What drinks to drink at a party</h3>
              <p>
                When it comes to drinking at a party, it's important to keep in mind that your choice of drinks can have a big impact on how you'll feel at the end of the night. It's important to choose drinks that are tasty and refreshing, but also moderate in alcohol content to avoid a hangover the next day.

                <br /><br />A popular option for parties are cocktails. Cocktails are mixed drinks that combine different types of spirits and juices or soft drinks. Cocktails can be tasty and easy to drink, and there are a wide variety of options to choose from. Some of the most popular cocktails include the margarita, daiquiri, and mojito.

                <br /><br />Another popular choice is beer. Beers are a good choice for those who prefer something lighter and easier to drink. There are many varieties of beer available, from light ales to darker and stronger beers. Beers are also great for sharing with friends.

                <br /><br />Finally, wine is another popular choice for parties. Wine is an elegant and sophisticated drink that is perfect for special occasions. There are many different types of wine to choose from, from white and rosé wines to stronger red wines.

                <br /><br />In conclusion, there are many different options when it comes to choosing drinks for a party. It's important to choose drinks that are tasty and refreshing, but also moderate in alcohol content to avoid a hangover the next day. Cocktails, beers and wine are popular choices for parties and there is a wide variety of options to choose from. The most important thing is to enjoy the party and drink responsibly.
              </p>
            </div>
            <br />
          </>
        ) : (
          <>
            <h1 className="my-0 mx-auto mt-8 text-[40px] font-bold w-[80%]">Blog</h1>
            <hr></hr>
            <div className="my-9 mx-auto w-[80%]">
              <h3 className="text-[28px] font-semibold mb-4">Perquè és beneficiós sortir de festa</h3>
              <p>La idea de sortir de festa sol ser vista per molts com un hàbit poc saludable, no obstant, hi ha diversos beneficis de sortir de festa que sovint passen desapercebuts.

                <br /><br />En primer lloc, sortir de festa pot ser una gran manera de socialitzar. És una oportunitat per conèixer gent nova, compartir experiències i connectar-se amb persones que comparteixen interessos semblants. A més, la música i el ball són uns mitjans excel·lents per alliberar tensions i gaudir d'un ambient distès.

                <br /><br />D'altra banda, sortir de festa també pot ser beneficiós per a la salut mental. En aquests esdeveniments, les persones poden desconnectar de les preocupacions quotidianes, permetent-los alliberar l'estrès i l'ansietat que acumulen. La música, la diversió i l'adrenalina alliberada en ballar i riure poden actuar com una mena de teràpia emocional, millorant l'estat d'ànim i reduint els nivells de cortisol.

                <br /><br />Finalment, sortir de festa també pot ser una oportunitat per experimentar coses noves i desenvolupar habilitats socials. Per exemple, pot ser una oportunitat per practicar la comunicació efectiva, la gestió del temps i l'organització, habilitats que es poden aplicar a la vida quotidiana.

                <br /><br />En conclusió, sortir de festa no només pot ser una manera de divertir-se i gaudir de la vida, sinó també una manera de socialitzar, reduir l'estrès i experimentar coses noves. Sempre que es faci de manera responsable, sortir de festa pot ser un hàbit saludable que pot tenir molts beneficis per a la salut física i mental.</p>
            </div>
            <hr></hr>
            <div className="my-9 mx-auto w-[80%]">
              <h3 className="text-[28px] font-semibold mb-4">Les festes a l'era digital</h3>
              <p>
                Les xarxes socials i la tecnologia han canviat la manera com s'organitzen i es comparteixen les festes. Avui dia, la majoria de les persones utilitzen les xarxes socials per informar-se sobre esdeveniments i per compartir fotos i vídeos de les festes a què assisteixen.

                <br /><br />Les xarxes socials han esdevingut una eina essencial per a l'organització d'esdeveniments. Els organitzadors de festes poden crear esdeveniments a Be Social o enviar invitacions per correu electrònic perquè els convidats confirmin la seva assistència. A més, les xarxes socials permeten que els convidats comparteixin informació sobre la festa amb els amics i familiars, cosa que pot augmentar l'assistència.

                <br /><br />Les xarxes socials també permeten que els convidats comparteixin fotos i vídeos de la festa en temps real. Els organitzadors de festes poden crear hashtags específics per a la festa perquè els convidats puguin etiquetar les seves fotos i vídeos. Això permet que les persones que no van poder assistir a la festa puguin veure què va passar i sentir-se part de l'experiència.

                <br /><br />La tecnologia també ha canviat la manera com s'escolta i es comparteix música a les festes. En lloc de portar una gran quantitat de CDs o equips de música voluminosos, els organitzadors de festes poden utilitzar aplicacions com Spotify o Apple Music per crear llistes de reproducció personalitzades i reproduir-les en altaveus Bluetooth.

                <br /><br />En conclusió, les xarxes socials i la tecnologia han canviat la manera com s'organitzen i es comparteixen les festes. Les xarxes socials permeten una major interacció entre els organitzadors de festes i els convidats, i la tecnologia permet més flexibilitat en la selecció i reproducció de música. Sens dubte, les festes a l'era digital han evolucionat i han esdevingut més accessibles i interactives gràcies a la tecnologia i les xarxes socials.
              </p>
            </div>
            <hr></hr>
            <div className="my-9 mx-auto w-[80%]">
              <h3 className="text-[28px] font-semibold mb-4">La seguretat a les festes</h3>
              <p>
                La seguretat a les festes és un tema molt important i que ha de ser abordat amb responsabilitat. A les festes poden ocórrer accidents o problemes, especialment quan hi ha una gran quantitat de persones i alcohol involucrats. Per això, és essencial prendre mesures per garantir la seguretat dels assistents i prevenir qualsevol tipus de problema.

                <br /><br />Una de les mesures més importants que es poden prendre és contractar personal de seguretat capacitat i experimentat. Aquestes persones poden supervisar l'entrada i la sortida de la festa, vigilar el comportament dels assistents i prevenir qualsevol tipus de conflicte o problema. També poden actuar ràpidament en cas d'emergència i proporcionar assistència mèdica si cal.

                <br /><br />Una altra mesura important és evitar el consum excessiu d'alcohol. Això es pot fer controlant la quantitat dalcohol que se serveix i oferint opcions no alcohòliques. També és important educar els convidats sobre els perills del consum excessiu d'alcohol i proporcionar alternatives perquè es diverteixin sense necessitat de beure.

                <br /><br />A més, és important tenir en compte la seguretat física del lloc on se celebra la festa. Cal que els organitzadors de festes assegurin que el lloc tingui prou espai per als convidats i que les sortides d'emergència estiguin clarament senyalitzades. També és important comprovar que les instal·lacions elèctriques i d'il·luminació estiguin en bones condicions per prevenir accidents.

                <br /><br />En conclusió, la seguretat a les festes és essencial i ha de ser presa de debò. En contractar personal de seguretat capacitat, controlar el consum d'alcohol, educar els convidats i assegurar la seguretat física del lloc, es pot garantir una festa divertida i segura per a tots els assistents.
              </p>
            </div>
            <hr></hr>
            <div className="my-9 mx-auto w-[80%]">
              <h3 className="text-[28px] font-semibold mb-4">Quines begudes prendre de festa</h3>
              <p>
                Quan es tracta de beure en una festa, és important tenir en compte que lelecció de les begudes pot tenir un gran impacte en com se sentirà un al final de la nit. És important triar begudes que siguin saboroses i refrescants, però que també siguin moderades en el contingut d'alcohol per evitar una ressaca l'endemà.

                <br /><br />Una opció popular per a les festes són els còctels. Els còctels són begudes barrejades que combinen diferents tipus de licors i sucs o refrescos. Els còctels poden ser saborosos i fàcils de beure, i hi ha una gran varietat d'opcions per triar. Alguns dels còctels més populars inclouen la margarida, el daiquiri i el mojito.

                <br /><br />Una altra opció popular són les cerveses. Les cerveses són una bona opció per a aquells que prefereixen una mica més lleuger i fàcil de beure. Hi ha moltes varietats de cerveses disponibles, des de cerveses lleugeres fins a cerveses més fosques i fortes. Les cerveses també són ideals per compartir amb amics.

                <br /><br />Finalment, el vi és una altra opció popular per a les festes. El vi és una beguda elegant i sofisticada que és perfecta per a ocasions especials. Hi ha molts tipus diferents de vi per triar, des de vins blancs i rosats fins a vins negres més forts.

                <br /><br />En conclusió, hi ha moltes opcions diferents quan es tracta d'escollir begudes per a una festa. És important triar begudes que siguin saboroses i refrescants, però que també siguin moderades en el contingut d'alcohol per evitar una ressaca l'endemà. Els còctels, les cerveses i el vi són opcions populars per a les festes i hi ha una gran varietat d'opcions per triar. El més important és gaudir de la festa i beure amb responsabilitat.
              </p>
            </div>
            <br />
          </>
        )}
      </div>
    </div>
  );
}
