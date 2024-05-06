

export function closeDropDowns(e: MouseEvent) {
  const elem = e.target as Element | null;

  if(!elem) return;

  const drop_downs = document.getElementsByClassName('show-dropdown');

  Array.from(drop_downs).forEach((el) => {

    if( !el.contains(elem) ) {

      const currentTarget = elem.parentElement?.parentElement?.getElementsByTagName('div')[0];

      if(currentTarget === el) return;

      el.classList.remove('show-dropdown');
    };
  });
};
