import Icon from '~/terminal/components/icon';

type FilterProps = {
  text: string;
};

export default function AttributesFilter({ text }: FilterProps) {
  return (
    <>
      <button className="button button--filled attributes-filter">
        {text}

        <Icon kind="filter" />
      </button>
    </>
  );
}
