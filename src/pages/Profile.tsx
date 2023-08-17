import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItemDivider} from '@ionic/react';
import { IonButton, IonButtons, IonIcon, useIonViewDidEnter } from '@ionic/react';
import React, { useRef, useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { IonItem, IonLabel, IonAvatar } from '@ionic/react';
import styles from "./Home.module.css";
import { AccountStore } from '../data/AccountStore';
import CardSlide from '../components/CardSlide';
import { searchOutline } from 'ionicons/icons';
import { forwardRef, ReactNode } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

interface ResetProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const Dashboard: React.FC<ResetProps> = ({ match }) => {

  const history = useHistory();
  const [users, setUsers] = useState<Array<any>>([]);

  useEffect(() => {
    const api = axios.create({
        baseURL: `https://reqres.in/api`
    })
    api.get("/users")
        .then(res => {             
            setUsers(res.data.data)
        })
        .catch(error=>{
            console.log("Error fetching data")
        })
  }, []);

  const cards = AccountStore.useState(s => s.cards);
	const profile = AccountStore.useState(s => s.profile);

	const [ pageTitle, setPageTitle ] = useState(cards[0].description);
	const [ mainColor, setMainColor ] = useState(cards[0].color);
	const [ slideSpace, setSlideSpace ] = useState(10);

	const slidesRef = useRef();

	useIonViewDidEnter(() => {
        setSlideSpace(0);
  });

  const changeSlide = async e => {

		const swiper = e;
		const swiperIndex = swiper.activeIndex;

		setPageTitle(cards[swiperIndex].description);
		setMainColor(cards[swiperIndex].color);

		document.getElementById(`slide_${ swiperIndex }_balance`).classList.add("animate__headShake");

		setTimeout(() => {
			
			document.getElementById(`slide_${ swiperIndex }_balance`).classList.remove("animate__headShake");
		}, 1000);
	}

	const manageTouch = async (touched, e) => {

		const swiper = e;
		const swiperIndex = swiper.activeIndex;
		
		if (touched) {
			
			document.getElementById(`slide_${ swiperIndex }_transactions`).classList.add("animate__fadeOut");
		} else {

			document.getElementById(`slide_${ swiperIndex }_transactions`).classList.remove("animate__fadeOut");
			document.getElementById(`slide_${ swiperIndex }_transactions`).classList.add("animate__fadeIn");
		}
	}

  return (
    
    <IonPage className={ styles.homePage }>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen className="ion-padding ion-text-center">
        <IonGrid>
          <IonRow>
              <IonCol>
                  <h4>My Credit Cards</h4>
              </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>
              <Swiper spaceBetween={ slideSpace } ref={ slidesRef } slidesPerView={ 1 } className={ styles.cardsContainer }  onTouchStart={ e => manageTouch(true, e) } onTouchEnd={ e => manageTouch(false, e) } onSlideChange={ e => changeSlide(e) }>

						{ cards.map((card, index) => {
							return (

								<SwiperSlide key={ `slide_${ index }` } id={ `slide_${ index }` } className={ styles.customSlide }>
									<CardSlide key={ index } card={ card } profile={ profile } index={ index } />
								</SwiperSlide>
							);
						})}
					</Swiper>
          </IonCol>
          </IonRow>
          
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
