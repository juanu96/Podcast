import React, { useState, useEffect } from 'react'
import { gql, useQuery } from "@apollo/client";
import './Suscribe.scss'

const SUBSCRIBESECTION = gql`
    {
        pages(where: {id: 8}) {
            edges {
                node {
                    subscribe {
                        subscribesection {
                            title
                            placeholder
                            content
                            button
                        }
                    }
                }
            }
        }
    }
`;

export default function Subscribe() {
    const { loading, data } = useQuery(SUBSCRIBESECTION);
    const [SubscribeSection, setSubscribeSection] = useState();
    const [email, setEmail] = useState(null)
    const [Message, setMessage] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [validateError, setValidateError] = useState(null);
    const sendMessage = async () => {
        if (enviado === false) {
            const contactFormId = "173";
            const contactFormUrl = `https://podcasts.morpheus-creations.com/wp-json/contact-form-7/v1/contact-forms/${contactFormId}/feedback`;
            const formData = new FormData();

            formData.append("Email", email);

            formData.append(
                "subject",
                `New message sent from ${window.location.href}`
            );

            var requestOptions = {
                method: "POST",
                body: formData,
                redirect: "follow",
            };

            fetch(contactFormUrl, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    const data = JSON.parse(result);
                    setEnviado(true);
                    setMessage(data.message);
                    setEmail('')
                })
                .catch((error) => console.log("error", error));
        }
    };

    useEffect(() => {
        if (!loading) {
            setSubscribeSection(data?.pages?.edges[0]?.node?.subscribe?.subscribesection)
        }
    }, [loading, data])

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const validateEmail = () => {
        if (email && email.match(isValidEmail)) {
            sendMessage()
            setValidateError('Email sent')
        } else {
            setValidateError('Please verify the email is valid');
        }
    }

    return (
        <div id="suscribe" className='suscribeContainer'>
            <div className='suscribeRow'>
                <h2
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true">{SubscribeSection ? SubscribeSection.title : null}</h2>
                <p className='text-center'
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true">{SubscribeSection ? SubscribeSection.content : null}</p>
                <div className='newsletter'
                    data-aos="fade-up"
                    data-aos-offset="200"
                    data-aos-delay="50"
                    data-aos-duration="1000"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='email' type='email' placeholder={SubscribeSection ? SubscribeSection.placeholder : null} />
                    <h3 className='btnSuscribe' onClick={() => validateEmail()}>{SubscribeSection ? SubscribeSection.button : null} </h3>

                </div>
                <p>{Message ? Message : validateError ? validateError : null}</p>
            </div>
        </div>
    )
}
