import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';

class InfiniteScroll extends React.Component {
  constructor(...args) {
    super(...args);

    this.container = null;

    // Binding to the current instance of InfiniteScroll component:
    this.scrollListener = this.scrollListener.bind(this);
  }

  componentDidMount() {
    // Listening the scroll event
    document.addEventListener('scroll', this.scrollListener);

    // HATIRLA!
    // this.scrollListener'den haberi yok InfiniteScroll'un.
    // Haberdar etmek için bind etmen gerekir.
  }

  componentWillUnmount() {
    // Stop listening the scroll event
    document.removeEventListener('scroll', this.scrollListener);
  }

  scrollListener() {
    const { isSearchLoading, isActive } = this.props;
    const { onTrigger } = this.props;

    const viewportHeight = document.documentElement.clientHeight;
    const { bottom } = this.container.getBoundingClientRect();

    if (isActive && !isSearchLoading && bottom <= viewportHeight) {
      onTrigger();
    }
  }

  render() {
    const { children, isSearchLoading } = this.props;
    return (
      <div ref={e => (this.container = e)}>
        {children}
        {isSearchLoading && <Spinner />}
      </div>
    );
  }
}

export default InfiniteScroll;

InfiniteScroll.propTypes = {
  children: PropTypes.element.isRequired,
  isSearchLoading: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onTrigger: PropTypes.func.isRequired
};

/**
 * Geriye kalan tek iş scrollListener() fonksiyonunu scroll eventine bağlamak.
 * document.addEventListener fonksiyonu ile kolayca halledilebilir.
 *
 * Fakat bu bağlama işlemini nerede/ne zaman yapacağız?
 * Construction esnasında mı?
 * Hayır.
 *
 * scrollListener işlevini yerine getirebilmesi ancak
 * fonksiyon çalıştığında container div'in DOM'da bulunmasıyla mümkün olabilir.
 *      <this>.container.getBoundingClientRect();
 *
 * Element ise, component, DOM'a aktarıldığında erişilebilir olacak.
 *
 * Yani construction sonrası!
 *
 * Dolayısıyla komponentin DOM'a aktarıldığından emin olduğumuz anda bu işlemi gerçekleştirmeliyiz.
 *
 * Kullanman gereken 'life cycle' metodu: componentDidMound
 *
 *
 *
 *
 * ------------ II. SORUN
 * İkinci bir sorun da şu:
 * this.container.getBoundingClientRect() ifadesinin
 * component unmount edildikten sonra çalıştırılması sonucu ortaya çıkacak.
 *
 * Örneğin scrolling yapılan bir sayfadan sonra, InfiniteScroll komponentinin kullanılmadığı bir sayfaya geçildiğini düşün.
 * Söz konusu komponent ve ilgili ref'ler yok edilecek.
 * Ama sen halen tarayıcının scroll eventine bağlısın, verdiğin handler da scrollListener.
 * scrollListener'da div ref'ine ihtiyaç duyuyor ?
 * Ama ref artık yok?!
 * EXCEPTION.
 *
 *
 * Ref ile ilgili dökümantasyona göre sözkonusu component unmount edildiğinde ilgili REF'ler yok edilir.
 * Dolayısıyla başka bir sayfaya geçtiğinde scrollListener'daki this ifadesi artık undefined olacak.
 * Ama sen halen tarayıcının scrolling eventine scrollListener ile bağlısın.
 * Dolayısıyla bir sonraki scroll event tetiklenmesi,
 *  ref artık bulunmadığından ve this = undefined olduğundan exception ile sonuçlanacak!
 */

// 'element' means that
//    we are expecting just a single element
//      to be wrapped in our InfiniteScroll component
