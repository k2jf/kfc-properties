# kfc-properties
single page property manager to easily view & modify the properties

## maintainer
zhangzhenbang

## install
```bash
git remote add -f kfc-properties git@github.com:k2jf/kfc-properties.git
git subtree add -P src/components/kfc-properties kfc-properties master --squash
```

> **note** this components rely on backend `kbc-properties` to work properly. 

## use case
simply grab & use

```vue
<template>
  <Card dis-hover shadow><!-- use iview-Card to format, it's optional -->
    <p slot="title">属性查看器</p>
    <PropertyManager></PropertyManager>
  </Card>
</template>

<script>
  import {Card} from 'iview'
  import PropertyManager from '@/components/kfc-properties'
  export default {
    name: 'PropertyManagerShowPage',
    components: {
      Card,
      PropertyManager
    }
  };
</script>
```

## limitation
This components does not aim to be a full-fledged property manager, but instead
a very basic page to modify the pre-defined properties, thus it *does not* support
operations such as adding/removing.
