import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './../src/containers/content/css/bootstrap.min.css';
import './../src/containers/content/css/react-bootstrap-table-all.min.css';
import '../src/containers/content/css/sb-admin.css';
import '../src/containers/content/css/login.css';
import '../src/containers/content/fontawesome/css/font-awesome.min.css';

import Adminhome from './containers/content/Adminhome';
import DevamEden from './pages/Admin/DevamEdenProjeler';
import IptalProje from './pages/Admin/IptalProje';
import BitenProje from './pages/Admin/BitenProje';
import Contact from './pages/Admin/Contact';
import ProjeEkle from './pages/Admin/ProjeEkle';
import Uyeler from './pages/Admin/Uyeler';
import FirmaEkle from './pages/Admin/FirmaEkle';
import KategoriEkle from './pages/Admin/KategoriEkle';
import KategoriOzellikEkle from './pages/Admin/KategoriOzellikEkle';
import KategoriOzellikDegister from './pages/Admin/KatOzDegistir';
import KategoriDuzenle from './pages/Admin/KategoriDuzenle';
import UyeDetay from './pages/Admin/UyeDetay';
import UyeOzellikDegistir from './pages/Admin/UyeOzellikDegistir';
import ProjeDetay from './pages/Admin/ProjeDetay';
import SatisDetay from './pages/Admin/SatisDetay';
import ProjeOzellikDegis from './pages/Admin/ProjeOzellikDegistir';
import MemberHome from './pages/Member/MemberHome';
import Login from './pages/Login';
import AlınanProjeler from './pages/Member/AlınanProjeler';
import HakkındaBilgiler from './pages/Member/HakkındaBilgiler';
import İletişim from './pages/Member/İletişim';
import Profilim from './pages/Member/Profilim';
import ProjeDetayMember from './pages/Member/ProjeDetayMember';
import SatisDetayMember from './pages/Member/SatisDetayMember';
import ProfilGuncelle from './pages/Member/ProfilGuncelle';
import MyProfileAdmin from './pages/Admin/MyProfileAdmin';
import MyProfileUpdate from './pages/Admin/MyProfileUpdate';
import Reports from './pages/Admin/Reports';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/adminhome" component={Adminhome} />
      <Route path="/devamedenprojeler" component={DevamEden} />
      <Route path="/bitenprojeler" component={BitenProje} />
      <Route path="/iptalprojeler" component={IptalProje} />
      <Route path="/iletisimA" component={Contact} />
      <Route path="/projeekle" component={ProjeEkle} />
      <Route path="/uyeler" component={Uyeler} />
      <Route path="/firmaekle" component={FirmaEkle} />
      <Route path="/kategoriekle" component={KategoriEkle} />
      <Route path="/katozellikekle" component={KategoriOzellikEkle} />
      <Route path="/katozdegistir" component={KategoriOzellikDegister} />
      <Route path="/kategoriduzenle" component={KategoriDuzenle} />
      <Route path="/uyedetay/:memberId" component={UyeDetay} />
      <Route path="/uyeozellikdegis/:memberId" component={UyeOzellikDegistir} />
      <Route path="/projedetay/:projectId" component={ProjeDetay} />
      <Route path="/satisdetay/:saleId" component={SatisDetay} />
      <Route path="/projeozellikdegis/:projectId/:saleId" component={ProjeOzellikDegis} />
      <Route path="/memberhome" component={MemberHome} />
      <Route path="/alinanprojeler" component={AlınanProjeler} />
      <Route path="/hakkinda" component={HakkındaBilgiler} />
      <Route path="/profilim" component={Profilim} />
      <Route path="/iletisim" component={İletişim} />
      <Route path="/projedetaymember/:projectId" component={ProjeDetayMember} />
      <Route path="/satisdetaymember/:saleId" component={SatisDetayMember} />
      <Route path="/profilguncelle/:memberId" component={ProfilGuncelle} />
      <Route path="/myprofile" component={MyProfileAdmin} />
      <Route path="/myprofileupdate" component={MyProfileUpdate} />
      <Route path="/reports" component={Reports} />
       <Route path="/contact" component={Contact} />
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
