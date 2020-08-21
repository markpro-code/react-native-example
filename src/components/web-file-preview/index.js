import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Document, Page, pdfjs } from 'react-pdf';
import { get, range } from 'lodash';

pdfjs.GlobalWorkerOptions.workerSrc = `/static/libs/pdf.js/pdf.worker.js`;

// const useDevProxy = process.env.BT_BUILD_ENV === 'dev' && process.env.BT_USE_DEV_PROXY === 'true';
export const supportedFileTypes = ['pdf', 'bmp', 'jpg', 'jpeg', 'png'];

export default function WebFilePreview(props) {
  const { fileType, style } = props;
  const { fileUrl } = props;

  console.info('props', props);

  // fileUrl = useDevProxy ? `/api${fileUrl}` : fileUrl;

  const containerEle = useRef(null);
  const [previewHeight, setPreviewHeight] = useState(0);
  const [previewWidth, setPreviewWidth] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(
    function () {
      const previewHeight = get(containerEle, 'current.clientHeight', 300);
      const previewWidth = get(containerEle, 'current.clientWidth', 300);
      setPreviewHeight(previewHeight);
      setPreviewWidth(previewWidth);
    },
    [containerEle]
  );

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setTotalPage(numPages);
  };

  let content;

  if (fileType == null || fileUrl == null) {
    content = <div style={{ margin: 20, color: 'red' }}>未获取到参数: fileType 或 fileUrl</div>;
  } else if (!supportedFileTypes.includes(fileType.toLowerCase())) {
    content = (
      <div style={{ flex: '1', flexDirection: 'column', margin: 20 }}>
        <span>
          暂不支持此种格式的文件: {fileType}, 请上传 {supportedFileTypes.join(', ')} 格式文件.
        </span>
      </div>
    );
  } else if (fileType.toLowerCase() === 'pdf') {
    content = (
      <Document file={fileUrl} onLoadSuccess={handleDocumentLoadSuccess}>
        {range(totalPage).map(index => (
          <Page pageNumber={index + 1} width={previewWidth} />
        ))}
      </Document>
    );
  } else {
    content = (
      <Image source={{ uri: fileUrl }} style={{ width: previewWidth, height: previewHeight }} resizeMode="contain" />
    );
  }

  return (
    <View style={style}>
      <div ref={containerEle} style={{ flex: '1', flexDirection: 'column' }}>
        {content}
      </div>
    </View>
  );
}

// type check
WebFilePreview.propTypes = {
  style: PropTypes.object,
  fileType: PropTypes.string.isRequired,
  fileUrl: PropTypes.string.isRequired,
};

WebFilePreview.defaultProps = {
  style: null,
};
