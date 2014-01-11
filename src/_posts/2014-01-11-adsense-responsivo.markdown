---
layout: post
title:  "Adsense responsivo e algumas notas"
description: "Ano novo, layout novo, e ads espalhados por ai. Duas breves explicações."
tags: 
- adsense 
- responsive
- SEO
image_thumb: "/media/adsense-responsivo-thumb.jpg"
image_highlight: "/media/adsense-responsivo.jpg"
---

Ano novo, layout novo, e ads espalhados por ai. Duas breves explicações.

*Obs: Vou me alongar em algumas explicações que fogem um pouco do foco do post. Se não estiver afim de ler, basta pular para a seção "Sem mais enrolações vamos ao Adsense responsivo".*

<!--more-->

## Novo layout

Mudei o layout para essa versão mais _clean_ porque foquei na melhor experiência de leitura possível para mim.

Tenho problemas de visão e uso uma extensão do Chrome chamada [Clearly](https://chrome.google.com/webstore/detail/clearly/iooicodkiihhpojmmeghjclgihfjdjhj?hl=en) desenvolvida pela galera do Evernote que tem uma formatação semelhante e usei o [Medium](https://medium.com) do Twitter como referência também.

Eu particularmente achei que ficou muito prático de ler. Espero que tenham gostado também.

Além disso adicionei os posts relacionados. Esse pequeno *improvement* gerou uma redução de 9% no bounce rate e 15% de aumento no número de páginas visitadas por usuário. Sou meio afixionado com testes e dados, gosto de mensurar tudo.

E já ia me esquecendo do scroll infinito de posts. Nada de paginação manual agora.

Voltando aos números, deu para manter o pagespeed da home em 93 e o ySlow em 90. Um dia chego à 100 e igualo o recorde do about:blank.

## Adsense no blog

Provavelmente você notou alguns Ads do google adsense espalhados pelo blog. Tenho meus motivos e o menor deles é ganhar dinheiro.

Sempre tive um foco muito grande em SEO. Trabalhei em um grande portal de conteúdo voltado para desenvolvedores como Analista por um tempo e fiz o curso da Agência Mestre (MestreSEO na época). Boa parte desse conhecimento é aplicado aqui, no meu blog e pretendo dar meus pitacos sobre SEO em alguns posts.

Aliás gostaria de me parabenizar. Nos últimos dias ultrapassei o meu último rival pelo termo "desenvolvedor front end". 

Um sitezinho com uns artigos sobre tudo que existe no mundo. Se não falha a memória se chama Wikipedia.

Voltando ao assunto. Tenho uma bagagem interessante de SEO, mas pouquíssima de Adwords e nunca tinha tocado em Adsense.

O blog agora com está 4k~5k de pageviews mensais e crescendo o que já serve de base para alguns testes de conversão e melhor entendimento da ferramenta. Não queria me arriscar com algum cliente sem ter um bom domínio antes.

"_Mas se o dinheiro não importa, o que você vai fazer com ele?_" <br /> 
O que qualquer pessoa sensata faria. Gastar em cerveja.

## Sem mais enrolações vamos ao Adsense responsivo

Vou separar a explicação em pequenos passos. É bem simples, mas procurei detalhar o máximo que eu pude. Se estiver muito explicadinho e cansativo, comente a respeito.

### Primeiro passo - Criar os anúncios no Adsense

Basta acessar o site do [Google Adsense](https://google.com/adsense), criar uma nova conta e criar um conjunto de anúncios. Chamarei os ads de anúncios no decorrer da explicação.

Os anúncios criados devem ser usados em um único ponto do site, ou seja, não use o mesmo anúncio várias vezes na mesma página. Eles tem um tamanho pré-definido ao serem criados. O google possui uma vasta [variedade de dimensões](https://support.google.com/adsense/answer/185665?utm_source=aso&utm_medium=link&utm_campaign=ww-ww-et-asfe_), inclusive uma que teoricamente é responsiva, mas está em *beta* e eu não levei muita fé no seu funcionamento.

No meu blog usei o seguinte conjunto de anúncios.

* Grupos com 970px x 90px para desktops.
* Grupos com 728px x 90px para tablets.
* Grupos com 320px x 50px para mobile

Criei dois de cada. Um para a lista de posts e um para os artigos. É importante que você crie anúncios diferentes para locais diferentes para facilitar na hora de mensurar os resultados.

Fiz alguns outros mais específicos, mas o importante para esse artigo são esses.

Ao criar um novo anúncio, o google fornece o código a seguir:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Header - banner -->
<ins class="adsbygoogle"
     style="display:inline-block;width:320px;height:50px"
     data-ad-client="ca-pub-999999999999"
     data-ad-slot="99999999"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

Ele deve ser inserido no local onde você deseja que o anúncio criado apareça. Porém não usaremos dessa forma.

Precisamos carregar anúncios diferentes no mesmo container (elemento) para cada resolução diferente. Usando o código gerado, você fica limitado a largura do anúncio.

### Segundo passo - Inserir o script do Adsense e containers dos anúncios

Notem que para cada anúncio gerado o google altera somente o estilo inline e os códigos passados no data do *ins*.

Peguei então o script 
{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
{% endhighlight %} 
Já que ele era chamado em todos os anúncios e isolei no footer, chamando uma única vez.

Depois foi necessário criar os containeirs dos anúncios, o local onde eu gostaria que eles fossem inseridos.

Nos locais desejados adicionei o seguinte elemento:

Para o final dos posts:
{% highlight html %}
<ins class="adsbygoogle" id="footer-post-ad"></ins>
{% endhighlight %}

Para a lista de posts:
{% highlight html %}
<ins class="adsbygoogle" id="home-list-ad"></ins>
{% endhighlight %}

É importante manter a classe *adsbygoogle* já que o google usa ela para verificar os anúncios da página.

Para cada *container* de anúncio, use um ID diferente. Ele vai ser usado para inserir os dados necessários no elemento.

### Terceiro passo - Script de renderização de anúncio e CSS

Vou colocar o script que desenvolvi usando Zepto (jQuery) como biblioteca e explico o funcionamento abaixo nos comentários.

{% highlight javascript %}
// Obviamente, espere o DOM estar devidamente no seu lugar antes de fazer qualquer coisa.
$(document).ready(function(){

  // Google Adsense registrando um array que ele observa para renderizar os anúncios
  adsbygoogle = window.adsbygoogle || [];

  // Alguns caches de seletores, já que vamos usar em diversos pontos
  // - Armazenando a largura do browser. Vamos usar para calcular qual
  // - formato ideal de anúncio a ser inserido
  var _browserSize = $(window).width(),
      ads = {},
      // Cache dos seletores com base no ID que usaram ao criar os containers
      $homeList = $('#home-list-ad'),
      $footerPost = $('#footer-post-ad');

  // Funções que distribuem os ads de acordo com a resolução do usuário
  // Criei 3 grupos, mas podem ser usados quantos quiserem, basta que
  // Tenham anúncios específicos para cada grupo
  ads.fillDesktopAds = function(){
    ads.renderElem('ca-pub-123123123', '123123123', $homeList, 'ad-970');
    ads.renderElem('ca-pub-234234234', '234234234', $footerPost, 'ad-970');
  };

  ads.fillTabletAds = function(){
    ads.renderElem('ca-pub-345345345', '345345345', $homeList, 'ad-728');
    ads.renderElem('ca-pub-456456456', '456456456', $footerPost, 'ad-728');
  };

  ads.fillMobileAds = function(){
    ads.renderElem('ca-pub-567567567', '567567567', $homeList, 'ad-320');
    ads.renderElem('ca-pub-678678678', '678678678', $footerPost, 'ad-320');
  };

  // Função usada para adicionar os dados do anúncio aos containers criados
  // Ela recebe os dois parâmetros do Google que ele informa ao criar um anúncio
  // O container (elemento) e a sua classe para customização do CSS
  ads.renderElem = function(adClient, adSlot, elem, elemClass) {
    // Verifica se o elemento existe de fato no DOM. O Google gera um erro caso
    // Você chame a rotina sem um novo elemento de anúncio na página
    if (elem.length) {
      // Usei o data separado por uma limitação da versão mais enxuta do Zepto
      // Podem usar o modo que recebe um objeto se estiverem usando jQuery
      elem.data('ad-client', adClient).data('ad-slot' , adSlot);
      // Classe usada para customização da largura e posicionamento do anúncio
      if (elemClass){
        elem.addClass(elemClass);
      }
      // Para cada anúncio criado é necessário  dar um push no array criado no início do post
      adsbygoogle.push({});
    }
  };

  // Verifica a largura do browser e chama a função correspondente.
  // Caso tenha muitos cenários, é melhor optar por um Switch
  if (_browserSize > 900) {
    ads.fillDesktopAds();
  } else if (_browserSize > 480) {
    ads.fillTabletAds();
  } else {
    ads.fillMobileAds();
  }
});
{% endhighlight %}

E agora o CSS. Basicamente ele vai definir a largura dos anúncios.

{% highlight css %}
.ad-970 {
  width: 970px;
  height: 90px;
  display: block;
}
.ad-728 {
  width: 728px;
  height: 90px;
  display: block;
}
.ad-320 {
  width: 320px;
  height: 50px;
  display: block;
}
{% endhighlight %}

### Concluindo

Basicamente é isso. Eu dei uma incrementada em algumas coisas para usar no meu blog, mas com esse código já é possível usar anúncios específicos para cada resolução que você deseje.

Você pode dar uma olhada no [código do blog](https://github.com/leandrooriente/leandrooriente) se quiser analisar o que eu fiz. Inclusive a função que mantém esse anúncio chato na lateral está no mesmo arquivo do [adsense.js](https://github.com/leandrooriente/leandrooriente/blob/master/src/static/scripts/adsense.js).

Espero que tenham aproveitado e qualquer dúvida é só comentar.