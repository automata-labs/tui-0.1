import Spinner from '~/components/spinner';

export default function CollectionHeader() {
  return (
    <>
      <div className="collection-header pad">
        <div className="collection-image-wrapper">
          <Spinner kind="line" />
        </div>
        <div className="collection-core">
          <div>
            <Spinner kind="simpleDotsScrolling" />
          </div>
          <div className="collection-core-address">-</div>
        </div>

        <div className="collection-info">
          <div className="collection-info-group">
            <div className="collection-info-group-key">Floor Price</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">Top Bid</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">Total Volume</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">Total Listed</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">Total Supply</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">Total Holders</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  );
}
