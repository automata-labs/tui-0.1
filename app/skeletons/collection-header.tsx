import Spinner from '~/components/spinner';
import { Tab, Tabs } from '~/components/tabs';

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
          <div className="collection-core-address">
            -
          </div>
        </div>

        <div className="collection-info">
          <div className="collection-info-group">
            <div className="collection-info-group-key">FLOOR PRICE</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">TOP BID</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">TOTAL VOLUME</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">TOTAL LISTED</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">TOTAL SUPPLY</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
          <div className="collection-info-group">
            <div className="collection-info-group-key">TOTAL HOLDERS</div>
            <div className="collection-info-group-value">
              <Spinner kind="line" />
            </div>
          </div>
        </div>

        <Tabs>
          <Tab to={`.`} label="ITEMS" />
          <Tab to={`./holders`} label="HOLDERS" />
        </Tabs>
      </div>
      <div className="divider"></div>
    </>
  );
}
