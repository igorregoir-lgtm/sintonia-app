import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "./theme";

export function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

export function Card({ title, subtitle, children, right }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          {title ? <Text style={styles.cardTitle}>{title}</Text> : null}
          {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
        </View>
        {right ? <View>{right}</View> : null}
      </View>
      {children ? <View style={{ marginTop: 12 }}>{children}</View> : null}
    </View>
  );
}

export function PrimaryButton({ title, onPress, disabled }) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.primaryBtn,
        disabled ? { opacity: 0.5 } : null,
        pressed && !disabled ? { opacity: 0.9 } : null
      ]}
    >
      <Text style={styles.primaryBtnText}>{title}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.secondaryBtn, pressed ? { opacity: 0.9 } : null]}>
      <Text style={styles.secondaryBtnText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.bg,
    padding: 16
  },
  card: {
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  cardTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "600"
  },
  cardSubtitle: {
    color: theme.textMuted,
    fontSize: 12,
    marginTop: 4
  },
  primaryBtn: {
    backgroundColor: theme.teal,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center"
  },
  primaryBtnText: {
    color: theme.text,
    fontWeight: "700"
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: "center"
  },
  secondaryBtnText: {
    color: theme.text,
    fontWeight: "600"
  }
});

