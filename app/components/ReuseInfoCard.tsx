import Body from '@/components/atoms/Body';
import Subtitle from '@/components/atoms/Subtitle';
import '../../styles/glow.scss';

const ReuseInfoCard = ({
  data,
}: {
  data: { title: string; body: string | number | React.ReactNode }[];
}) => {
  function renderTextAsSpans(text: string) {
    return text
      .split('')
      .map((char: string, idx: number) => <span key={idx}>{char}</span>);
  }

  return (
    <div className="bg-stone-100 p-3 rounded-lg text-sm text-left mb-2">
      {data.map((item, index) => (
        <div
          key={item?.title + index}
          className={` ${index === data.length - 1 ? '' : 'mb-3'}`}
        >
          <Subtitle className="font-medium">{item?.title}</Subtitle>
          <Body className="text-xs glow-text">
            {typeof item?.body === 'string' || typeof item?.body === 'number'
              ? renderTextAsSpans(String(item?.body))
              : item?.body}
          </Body>
        </div>
      ))}
    </div>
  );
};

export default ReuseInfoCard;
