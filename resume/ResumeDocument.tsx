import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type { ReactNode } from 'react';
import type { Resume, Work } from '@/content';

/**
 * The résumé layout (ADR 0002): one page, single column, standard headings,
 * black text only. It renders whatever `Resume` it is given, so the public
 * PDF (#7) and the private PDF (#8) share it: private fields that are
 * `undefined` (the public edition) are simply left out.
 */

// Hyphenation splits words across lines, which breaks extracted text for
// applicant tracking systems. Keep every word whole.
Font.registerHyphenationCallback((word) => [word]);

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const month = (isoMonth: string) => {
  const [year, m] = isoMonth.split('-');
  return `${months[Number(m) - 1]} ${year}`;
};

const dates = (job: Work) =>
  `${month(job.startDate)} – ${job.endDate ? month(job.endDate) : 'Present'}`;

const RESUME_NETWORKS = ['LinkedIn', 'GitHub'];

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.35,
    color: '#000',
    paddingVertical: 36,
    paddingHorizontal: 44,
  },
  name: { fontFamily: 'Helvetica-Bold', fontSize: 18, lineHeight: 1.2 },
  label: { fontSize: 11, marginTop: 2 },
  contact: { marginTop: 4 },
  section: { marginTop: 10 },
  heading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    borderBottomWidth: 0.75,
    borderBottomColor: '#000',
    paddingBottom: 1,
    marginBottom: 4,
  },
  entry: { marginBottom: 5 },
  entryHead: { flexDirection: 'row', justifyContent: 'space-between' },
  bold: { fontFamily: 'Helvetica-Bold' },
  bullet: { flexDirection: 'row', marginTop: 1.5 },
  bulletMark: { width: 10 },
  bulletText: { flex: 1 },
});

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

export function ResumeDocument({ resume }: { resume: Resume }) {
  const { basics } = resume;
  const bare = (url: string) => url.replace(/^https:\/\/(www\.)?/, '');
  // Two fixed lines, so the contact details never wrap mid-line.
  const contact = [
    [basics.location.line, basics.phone, basics.email],
    [
      bare(basics.url),
      ...basics.profiles
        .filter((profile) => RESUME_NETWORKS.includes(profile.network))
        .map((profile) => bare(profile.url)),
    ],
  ].map((line) => line.filter(Boolean).join('  ·  '));

  return (
    <Document
      title={`${basics.name}: Résumé`}
      author={basics.name}
      subject={basics.label}
      creator={basics.name}
      producer={basics.name}
      language="en"
    >
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>{basics.name}</Text>
          <Text style={styles.label}>{basics.label}</Text>
          <View style={styles.contact}>
            {contact.map((line) => (
              <Text key={line}>{line}</Text>
            ))}
          </View>
          {basics.seeking ? <Text>{basics.seeking}</Text> : null}
        </View>

        <Section title="Summary">
          <Text>{basics.summary}</Text>
        </Section>

        <Section title="Experience">
          {resume.work.map((job) => (
            <View key={job.id} style={styles.entry} wrap={false}>
              <View style={styles.entryHead}>
                <Text>
                  <Text style={styles.bold}>{job.position}</Text>
                  {job.name ? `, ${job.name}` : ''}
                  {` · ${job.location}`}
                </Text>
                <Text>{dates(job)}</Text>
              </View>
              {job.recognition ? <Text>{job.recognition}</Text> : null}
              {job.highlights.map((highlight) => (
                <Bullet key={highlight.text}>{highlight.text}</Bullet>
              ))}
            </View>
          ))}
        </Section>

        <Section title="Projects">
          {resume.projects
            .filter((project) => project.status === 'building')
            .map((project) => (
              <View key={project.name} style={styles.entry} wrap={false}>
                <Text>
                  <Text style={styles.bold}>{project.name}</Text>
                  {' (building now)'}
                </Text>
                <Text>{project.description}</Text>
                {project.highlights.map((highlight) => (
                  <Bullet key={highlight.text}>{highlight.text}</Bullet>
                ))}
              </View>
            ))}
        </Section>

        <Section title="Skills">
          {resume.skills.map((group) => (
            <Text key={group.name}>
              <Text style={styles.bold}>{group.name}: </Text>
              {group.keywords.join(', ')}
            </Text>
          ))}
        </Section>

        <Section title="Education">
          {resume.education.map((school) => (
            <View key={school.institution} style={styles.entryHead}>
              <Text>
                <Text style={styles.bold}>
                  {school.studyType} in {school.area}
                </Text>
                {`, ${school.institution}`}
                {school.score ? ` · ${school.score}` : ''}
              </Text>
              <Text>{school.endDate}</Text>
            </View>
          ))}
        </Section>
      </Page>
    </Document>
  );
}
