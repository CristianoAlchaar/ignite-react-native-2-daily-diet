import { Avatar, Container, Logo } from "./styles";

import logoImg from './../../assets/logo.png';
import profileImg from './../../assets/profile.png';

export function HomeHeader(){
    return (
        <Container>
            <Logo source={logoImg}/>
            <Avatar source={profileImg}/>
        </Container>
    )
}