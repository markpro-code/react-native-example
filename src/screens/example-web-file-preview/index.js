import React from 'react';

import ScreenContainer from '@src/components/screen-container';
import WebFilePreview from '@src/components/web-file-preview';
import { ScrollView } from 'react-native';

export default function ExampleWebFilePreview() {
  return (
    <ScreenContainer>
      <ScrollView horizontal={false} style={{ flex: 1 }}>
        <WebFilePreview fileType="pdf" fileUrl="/static/pdf-example.pdf" style={{ height: 500 }} />
      </ScrollView>
    </ScreenContainer>
  );
}
